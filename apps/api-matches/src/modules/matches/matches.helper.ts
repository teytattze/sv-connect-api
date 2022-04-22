import { Injectable } from '@nestjs/common';
import {
  IMatch,
  IProject,
  IStudentWithProject,
  ISupervisor,
} from '@sv-connect/core-domain';

const FIELD_WEIGHT = 5;
const SPECIALIZATION_WEIGHT = 3;

// TODO: Single Student
// TODO: Get all supervisors that have the same field with the project
// TODO: Calculate the weightage for each supervisor
// TODO: Find the highest weightage and lowest capacity supervisor

// TODO: Selected Students
// TODO: Get all the projects and supervisor with project's fields
// TODO: Cluster projects and supervisors with fields
// TODO: Calculate all the project and supervisor weightages within each cluster
// TODO: Select top highest weightage supervisor (Must be same field)
// TODO: Organize the project and supervisor into an 2D Matrix
// TODO: Use Munkres Algorithm to find the best match

// TODO: Selected Students and Supervisors (Supervisors must be more than students)
// TODO: Calculate all the project and supervisor weightages
// TODO: Organize the project and supervisor into an 2D Matrix
// TODO: Use Munkres Algorithm to find the best match

@Injectable()
export class MatchesHelper {
  getProjectAndSupervisorsWeightages(
    project: IProject,
    supervisors: ISupervisor[]
  ) {
    return supervisors.map((supervisor) =>
      this.getProjectAndSupervisorWeightage(project, supervisor)
    );
  }

  getProjectAndSupervisorWeightage(project: IProject, supervisor: ISupervisor) {
    let weightage = 0;
    weightage += project.field.id === supervisor.field.id ? FIELD_WEIGHT : 0;
    const projectSpecizationsSet = new Set(
      project.specializations.map((spec) => spec.id)
    );
    const supervisorSpecizationsSet = new Set(
      supervisor.specializations.map((spec) => spec.id)
    );
    projectSpecizationsSet.forEach(
      (spec) =>
        (weightage += supervisorSpecizationsSet.has(spec)
          ? SPECIALIZATION_WEIGHT
          : 0)
    );
    return weightage;
  }

  makeStudentsByFieldClusters(
    students: IStudentWithProject[]
  ): Map<string, IStudentWithProject[]> {
    const result = new Map<string, IStudentWithProject[]>();
    students.forEach((student) => {
      const project = student.project;
      const fieldId = project.field.id;
      if (result.has(fieldId)) {
        result.get(fieldId).push(student);
      } else {
        result.set(fieldId, [student]);
      }
    });
    return result;
  }

  makeSupervisorsByFieldCluters = (
    supervisors: ISupervisor[]
  ): Map<string, ISupervisor[]> => {
    const result = new Map<string, ISupervisor[]>();
    supervisors.forEach((supervisor) => {
      const capacity = supervisor.capacity;
      const fieldId = supervisor.field.id;
      if (!result.has(fieldId)) result.set(fieldId, []);
      for (let i = 0; i < capacity; i++) result.get(fieldId).push(supervisor);
    });
    return result;
  };

  makeCapacityBySupervisorIdClusters = (
    matches: IMatch[]
  ): Map<string, number> => {
    const result = new Map<string, number>();
    matches.forEach((match) => {
      if (!match.isMatched) return;
      const supervisorId = match.supervisor.id;
      const capacity = match.supervisor.capacity;
      result.set(supervisorId, capacity);
    });
    matches.forEach((match) => {
      if (!match.isMatched) return;
      const supervisorId = match.supervisor.id;
      const capacity = result.get(supervisorId);
      result.set(supervisorId, capacity - 1);
    });
    return result;
  };
}
