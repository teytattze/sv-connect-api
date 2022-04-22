import { Injectable } from '@nestjs/common';
import { InvitationsRepository } from './invitations.repository';
import {
  IBulkRejectInvitationsByIdPayload,
  ICreateInvitationPayload,
  IIndexInvitationFilter,
  IInvitation,
  IInvitationsService,
} from '@sv-connect/core-domain';
import { InvitationStatus, Prisma } from '@prisma/client';
import to from 'await-to-js';
import { handlePrismaError } from './invitations.helper';
import { StudentsService } from '../students/students.service';
import { SupervisorsService } from '../supervisors/supervisors.service';
import { CoreRpcException, InvitationsCode } from '@sv-connect/core-common';

@Injectable()
export class InvitationsService implements IInvitationsService {
  constructor(
    private readonly invitationsRepository: InvitationsRepository,
    private readonly studentsService: StudentsService,
    private readonly supervisorsService: SupervisorsService
  ) {}

  async indexInvitations(
    filter?: IIndexInvitationFilter
  ): Promise<IInvitation[]> {
    const where = this.mapFilterToPrismaWhere(filter);
    const [error, invitations] = await to<IInvitation[]>(
      this.invitationsRepository.findInvitations(where)
    );
    if (error) handlePrismaError(error);
    return invitations;
  }

  async createInvitation(
    payload: ICreateInvitationPayload
  ): Promise<IInvitation> {
    const hasSupervisor = await this.isStudentHasSupervisor(payload.student.id);
    if (hasSupervisor)
      throw CoreRpcException.new(InvitationsCode.ALREADY_HAVE_SUPERVISOR);

    const [error, invitation] = await to<IInvitation>(
      this.invitationsRepository.createInvitation(payload)
    );
    if (error) handlePrismaError(error);
    return invitation;
  }

  async acceptInvitationById(id: string): Promise<IInvitation> {
    const [error, invitation] = await to<IInvitation>(
      this.invitationsRepository.updateInvitation(
        { id },
        { status: InvitationStatus.ACCEPTED }
      )
    );

    const { data: supervisor } =
      await this.supervisorsService.getSupervisorById(invitation.supervisorId);
    if (supervisor.capacity <= 0)
      throw CoreRpcException.new(InvitationsCode.SUPERVISOR_CAPACITY_EXCEEDED);

    await this.supervisorsService.updateSupervisorById(supervisor.id, {
      capacity: supervisor.capacity - 1,
    });

    const studentPendingInvitation = await this.indexInvitations({
      studentId: invitation.studentId,
      status: InvitationStatus.PENDING,
    });
    const ids = studentPendingInvitation.map((invitation) => invitation.id);
    await this.bulkRejectInvitationsById({ ids });

    await this.studentsService.updateStudentById(invitation.studentId, {
      supervisor: { id: invitation.supervisorId },
    });

    return invitation;
  }

  async bulkRejectInvitationsById(
    payload: IBulkRejectInvitationsByIdPayload
  ): Promise<IInvitation[]> {
    const { ids } = payload;
    const promises = ids.map((id) => this.rejectInvitationById(id));
    return await Promise.all(promises);
  }

  async rejectInvitationById(id: string): Promise<IInvitation> {
    const [error, invitation] = await to<IInvitation>(
      this.invitationsRepository.updateInvitation(
        { id },
        { status: InvitationStatus.REJECTED }
      )
    );
    if (error) handlePrismaError(error);
    return invitation;
  }

  async isStudentHasSupervisor(studentId: string): Promise<boolean> {
    const { data: student } = await this.studentsService.getStudentById(
      studentId
    );
    return !!student.supervisorId;
  }

  private mapFilterToPrismaWhere(
    filter?: IIndexInvitationFilter
  ): Prisma.InvitationWhereInput {
    const result: Prisma.InvitationWhereInput = {
      studentId: {},
      supervisorId: {},
    };

    if (filter?.studentId) {
      result.studentId = {
        ...(result.studentId as Prisma.StringFilter),
        equals: filter.studentId,
      };
    }
    if (filter?.supervisorId) {
      result.supervisorId = {
        ...(result.supervisorId as Prisma.StringFilter),
        equals: filter.supervisorId,
      };
    }
    if (filter?.status) {
      result.status = {
        ...(result.status as Prisma.EnumInvitationStatusFilter),
        equals: filter.status,
      };
    }

    return result;
  }
}
