import { Injectable } from '@nestjs/common';
import { InvitationsRepository } from './invitations.repository';
import {
  IBulkRejectInvitationsByIdPayload,
  ICreateInvitationPayload,
  IIndexInvitationFilterPayload,
  IInvitation,
  IInvitationsService,
} from '@sv-connect/core-domain';
import { InvitationStatus, Prisma } from '@prisma/client';
import to from 'await-to-js';
import { handlePrismaError } from './invitations.helper';
import { StudentsService } from '../students/students.service';

@Injectable()
export class InvitationsService implements IInvitationsService {
  constructor(
    private readonly invitationsRepository: InvitationsRepository,
    private readonly studentsService: StudentsService
  ) {}

  async indexInvitations(
    filter?: IIndexInvitationFilterPayload
  ): Promise<IInvitation[]> {
    const where = this.mapFilterToPrismaWhere(filter);
    const [error, invitations] = await to<IInvitation[], any>(
      this.invitationsRepository.findInvitations(where)
    );
    if (error) handlePrismaError(error);
    return invitations;
  }

  async createInvitation(
    payload: ICreateInvitationPayload
  ): Promise<IInvitation> {
    const [error, invitation] = await to<IInvitation, any>(
      this.invitationsRepository.createInvitation(payload)
    );
    if (error) handlePrismaError(error);
    return invitation;
  }

  async acceptInvitationById(id: string): Promise<IInvitation> {
    const [error, invitation] = await to<IInvitation, any>(
      this.invitationsRepository.updateInvitation(
        { id },
        { status: InvitationStatus.ACCEPTED }
      )
    );

    const studentPendingInvitation = await this.indexInvitations({
      studentId: invitation.studentId,
      status: InvitationStatus.PENDING,
    });
    const ids = studentPendingInvitation.map((invitation) => invitation.id);
    await this.bulkRejectInvitationsById({ ids });

    await this.studentsService.udpateStudentById(invitation.studentId, {
      supervisor: { id: invitation.supervisorId },
    });

    if (error) handlePrismaError(error);
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
    const [error, invitation] = await to<IInvitation, any>(
      this.invitationsRepository.updateInvitation(
        { id },
        { status: InvitationStatus.REJECTED }
      )
    );
    if (error) handlePrismaError(error);
    return invitation;
  }

  private mapFilterToPrismaWhere(
    filter?: IIndexInvitationFilterPayload
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
