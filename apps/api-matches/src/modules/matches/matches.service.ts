import { Injectable } from '@nestjs/common';
import { CoreRpcException, MatchesCode } from '@sv-connect/core-common';
import {
  IAcceptMatchesPayload,
  IMatch,
  IMatchesService,
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
  IStudent,
  IStudentWithProject,
  ISupervisor,
} from '@sv-connect/core-domain';
import { MunkresAlgorithm } from '../munkres/munkres.algorithm';
import { MunkresHelper } from '../munkres/munkres.helper';
import { Matrix } from '../munkres/munkres.types';
import { ProjectsService } from '../projects/projects.service';
import { StudentsService } from '../students/students.service';
import { SupervisorsService } from '../supervisors/supervisors.service';
import { MatchesHelper } from './matches.helper';

// TODO: handle null field

@Injectable()
export class MatchesService implements IMatchesService {
  constructor(
    private readonly munkresAlgorithm: MunkresAlgorithm,
    private readonly matchesHelper: MatchesHelper,
    private readonly projectsService: ProjectsService,
    private readonly studentsService: StudentsService,
    private readonly supervisorsService: SupervisorsService
  ) {}

  async acceptMatches(payload: IAcceptMatchesPayload): Promise<IStudent[]> {
    const { matches } = payload;
    const supervisorsCapacity =
      this.matchesHelper.makeCapacityBySupervisorIdClusters(matches);
    const supervisorIds = Array.from(supervisorsCapacity.keys());
    const supervisorPromises = supervisorIds.map((id) =>
      this.supervisorsService.updateSupervisorById(id, {
        capacity: supervisorsCapacity.get(id),
      })
    );
    const studentPromises = matches
      .filter((match) => match.isMatched)
      .map((match) =>
        this.studentsService.updateStudentById(match.student.id, {
          supervisor: { id: match.supervisor.id },
        })
      );
    await Promise.all(supervisorPromises);
    const studentsRes = await Promise.all(studentPromises);
    return studentsRes.map((res) => res.data);
  }

  async matchSingleStudent({ studentId }: IMatchSingleStudentPayload) {
    const student = await this.getStudentWithProjectByStudentId(studentId);
    const { data: supervisors } = await this.supervisorsService.indexSupervisor(
      { fieldId: student.project.field.id, minCapacity: 1 }
    );

    if (!supervisors || supervisors.length === 0)
      throw CoreRpcException.new(MatchesCode.SUPERVISOR_NOT_AVAILABLE);

    const weightages = this.matchesHelper.getProjectAndSupervisorsWeightages(
      student.project,
      supervisors
    );

    let curHighest = 0;
    let curIndex = -1;
    weightages.forEach((weightage, index) => {
      if (weightage > curHighest) {
        curHighest = weightage;
        curIndex = index;
      }
    });

    return {
      student,
      supervisor: curIndex >= 0 ? supervisors[curIndex] : null,
      isMatched: curIndex >= 0,
      isApproved: false,
    };
  }

  async matchSelectedStudents({
    studentIds,
  }: IMatchSelectedStudentsPayload): Promise<IMatch[]> {
    const students = await this.getStudentWithProjectsByStudentIds(studentIds);
    const studentsClusters =
      this.matchesHelper.makeStudentsByFieldClusters(students);

    let fieldIds = Array.from(studentsClusters.keys());

    const supervisors = await this.getSupervisorsByFieldIds(fieldIds);
    if (!supervisors || supervisors.length === 0)
      throw CoreRpcException.new(MatchesCode.SUPERVISOR_NOT_AVAILABLE);

    const supervisorsClusters =
      this.matchesHelper.makeSupervisorsByFieldCluters(supervisors);

    fieldIds = Array.from(supervisorsClusters.keys());

    const weightagesClusters = new Map<string, Matrix>();
    fieldIds.forEach((fieldId) => {
      const students = studentsClusters.get(fieldId);
      const supervisors = supervisorsClusters.get(fieldId);
      const costMatrix: Matrix = students.map((student) =>
        this.matchesHelper.getProjectAndSupervisorsWeightages(
          student.project,
          supervisors
        )
      );
      const profitMatrix = MunkresHelper.convertProfitToCost(costMatrix);
      weightagesClusters.set(fieldId, profitMatrix);
    });

    const resultsClusters = new Map<string, Matrix>();
    fieldIds.forEach((fieldId) => {
      const weightageMatrix = weightagesClusters.get(fieldId);
      const matchingResults = this.munkresAlgorithm.solve(weightageMatrix);
      resultsClusters.set(fieldId, matchingResults);
    });

    const results: IMatch[] = [];
    const matchedStudentId = new Set<string>();
    fieldIds.forEach((fieldId) => {
      const matchingResults = resultsClusters.get(fieldId);
      matchingResults.forEach((res) => {
        const student = studentsClusters.get(fieldId)[res[0]];
        const supervisor = supervisorsClusters.get(fieldId)[res[1]];
        matchedStudentId.add(student.id);
        results.push({
          student: student || null,
          supervisor: supervisor || null,
          isMatched: true,
          isApproved: false,
        });
      });
    });

    students.forEach((student) => {
      if (!matchedStudentId.has(student.id)) {
        results.push({
          student,
          supervisor: null,
          isMatched: false,
          isApproved: false,
        });
      }
    });
    return results;
  }

  async matchSelectedStudentsAndSupervisors({
    studentIds,
    supervisorIds,
  }: IMatchSelectedStudentsAndSupervisorsPayload): Promise<IMatch[]> {
    const students = await this.getStudentWithProjectsByStudentIds(studentIds);
    const supervisors = await this.getSuperviorsBySupervisorIds(supervisorIds);

    const expandedSupervisors = [];
    supervisors.forEach((supervisor) => {
      const capacity = supervisor.capacity;
      for (let i = 0; i < capacity; i++) expandedSupervisors.push(supervisor);
    });

    const costMatrix: Matrix = students.map((student) =>
      this.matchesHelper.getProjectAndSupervisorsWeightages(
        student.project,
        expandedSupervisors
      )
    );
    const profitMatrix = MunkresHelper.convertProfitToCost(costMatrix);
    const matchingResults = this.munkresAlgorithm.solve(profitMatrix);

    const results: IMatch[] = [];
    const matchedStudentId = new Set<string>();
    matchingResults.forEach((res) => {
      const student = students[res[0]];
      const supervisor = expandedSupervisors[res[1]];
      matchedStudentId.add(student.id);
      results.push({
        student: student || null,
        supervisor: supervisor || null,
        isMatched: true,
        isApproved: false,
      });
    });

    students.forEach((student) => {
      if (!matchedStudentId.has(student.id)) {
        results.push({
          student,
          supervisor: null,
          isMatched: false,
          isApproved: false,
        });
      }
    });
    return results;
  }

  private async getSupervisorsByFieldIds(
    fieldIds: string[]
  ): Promise<ISupervisor[]> {
    console.log(fieldIds);
    const promises = fieldIds.map((id) =>
      this.supervisorsService.indexSupervisor({
        fieldId: id,
        minCapacity: 1,
      })
    );
    const supervisorsRes = await Promise.all(promises);
    return supervisorsRes.map((res) => res.data).flat();
  }

  private async getStudentWithProjectsByStudentIds(studentIds: string[]) {
    const promises = studentIds.map((id) =>
      this.getStudentWithProjectByStudentId(id)
    );
    return await Promise.all(promises);
  }

  private async getStudentWithProjectByStudentId(
    studentId: string
  ): Promise<IStudentWithProject> {
    const { data: student } = await this.studentsService.getStudentById(
      studentId
    );
    const { data: project } = await this.projectsService.getProjectByStudentId(
      studentId
    );
    return { ...student, project };
  }

  private async getSuperviorsBySupervisorIds(
    supervisorIds: string[]
  ): Promise<ISupervisor[]> {
    const promises = supervisorIds.map((id) =>
      this.supervisorsService.getSupervisorById(id)
    );
    const supervisorsRes = await Promise.all(promises);
    return supervisorsRes.map((res) => res.data);
  }
}
