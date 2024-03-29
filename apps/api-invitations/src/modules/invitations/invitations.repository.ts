import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@sv-connect/app-common';
import {
  ICreateInvitationPayload,
  IInvitation,
  IUpdateInvitationPayload,
} from '@sv-connect/core-domain';

@Injectable()
export class InvitationsRepository {
  private readonly defaultSelect: Prisma.InvitationSelect = {
    id: true,
    message: true,
    status: true,
    studentId: true,
    supervisorId: true,
    createdAt: true,
    updatedAt: true,
    student: false,
    supervisor: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findInvitations(
    by?: Prisma.InvitationWhereInput
  ): Promise<IInvitation[]> {
    return (await this.prisma.invitation.findMany({
      where: by,
      select: this.defaultSelect,
    })) as IInvitation[];
  }

  async createInvitation(
    payload: ICreateInvitationPayload
  ): Promise<IInvitation> {
    return (await this.prisma.invitation.create({
      data: {
        message: payload.message,
        status: payload.status,
        student: { connect: payload.student },
        supervisor: { connect: payload.supervisor },
      },
      select: this.defaultSelect,
    })) as IInvitation;
  }

  async updateInvitation(
    by: Prisma.InvitationWhereUniqueInput,
    payload: IUpdateInvitationPayload
  ): Promise<IInvitation> {
    return (await this.prisma.invitation.update({
      where: { id: by.id },
      data: {
        message: payload.message,
        status: payload.status,
      },
      select: this.defaultSelect,
    })) as IInvitation;
  }
}
