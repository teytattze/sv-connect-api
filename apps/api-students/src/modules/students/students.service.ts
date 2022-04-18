import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { Optional, StudentsCode } from '@sv-connect/core-common';
import {
  ICreateStudentPayload,
  IIndexStudentFilterPayload,
  IStudent,
  IStudentsService,
  IUpdateStudentPayload,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { handlePrismaError } from './students.helper';
import { StudentsRepository } from './students.repository';

@Injectable()
export class StudentsService implements IStudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async indexStudents(
    filter?: IIndexStudentFilterPayload
  ): Promise<IStudent[]> {
    const by = this.mapFilterToPrismaWhere(filter);
    const [error, students] = await to<IStudent[], any>(
      this.studentsRepository.findStudents(by)
    );
    if (error) handlePrismaError(error);
    return students;
  }

  async getStudentById(id: string): Promise<IStudent> {
    const [error, student] = await to<IStudent, any>(
      this.studentsRepository.findStudent({ id })
    );
    if (error) handlePrismaError(error);
    if (!student) throw new RpcException(StudentsCode.STUDENT_NOT_FOUND);
    return student;
  }

  async getStudentByAccountId(accountId: string): Promise<IStudent> {
    const [error, student] = await to<IStudent, any>(
      this.studentsRepository.findStudent({ accountId })
    );
    if (error) handlePrismaError(error);
    if (!student) throw new RpcException(StudentsCode.STUDENT_NOT_FOUND);
    return student;
  }

  async createStudent(payload: ICreateStudentPayload): Promise<IStudent> {
    const [error, student] = await to<IStudent, any>(
      this.studentsRepository.createStudent(payload)
    );
    if (error) handlePrismaError(error);
    return student;
  }

  async updateStudentById(
    id: string,
    payload: IUpdateStudentPayload
  ): Promise<IStudent> {
    const [error, student] = await to<IStudent, any>(
      this.studentsRepository.updateStudent({ id }, payload)
    );
    if (error) handlePrismaError(error);
    return student;
  }

  async updateStudentByAccountId(
    accountId: string,
    payload: IUpdateStudentPayload
  ): Promise<IStudent> {
    const [error, student] = await to<IStudent, any>(
      this.studentsRepository.updateStudent({ accountId }, payload)
    );
    if (error) handlePrismaError(error);
    return student;
  }

  async deleteStudentById(id: string): Promise<void> {
    const [error] = await to<void, any>(
      this.studentsRepository.deleteStudent({ id })
    );
    if (error) handlePrismaError(error);
  }

  private mapFilterToPrismaWhere(
    filter: Optional<IIndexStudentFilterPayload>
  ): Prisma.StudentWhereInput {
    const result: Prisma.StudentWhereInput = {};

    if (filter?.supervisorId) {
      result.supervisorId = {
        ...(result.supervisorId as Prisma.StringFilter),
        equals: filter.supervisorId,
      };
    }
    if ('hasSupervisor' in filter) {
      if (filter.hasSupervisor) result.supervisorId = { not: { equals: null } };
      else result.supervisorId = { equals: null };
    }

    return result;
  }
}
