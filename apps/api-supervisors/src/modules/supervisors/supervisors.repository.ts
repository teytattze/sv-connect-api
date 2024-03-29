import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@sv-connect/app-common';
import {
  ICreateSupervisorPayload,
  IRegisterSupervisorPayload,
  ISupervisor,
  IUpdateSupervisorPayload,
} from '@sv-connect/core-domain';

@Injectable()
export class SupervisorsRepository {
  private readonly defaultSelect: Prisma.SupervisorSelect = {
    id: true,
    capacity: true,
    accountId: true,
    field: true,
    specializations: true,
    createdAt: true,
    updatedAt: true,
    students: true,
    account: false,
    fieldId: false,
    invitations: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async findSupervisors(
    by?: Prisma.SupervisorWhereInput
  ): Promise<ISupervisor[]> {
    return (await this.prisma.supervisor.findMany({
      where: by,
      select: this.defaultSelect,
    })) as ISupervisor[];
  }

  async findSupervisor(
    by: Prisma.SupervisorWhereUniqueInput
  ): Promise<ISupervisor> {
    return (await this.prisma.supervisor.findUnique({
      where: {
        id: by.id,
        accountId: by.accountId,
      },
      select: this.defaultSelect,
    })) as ISupervisor;
  }

  async createSupervisor(
    payload: ICreateSupervisorPayload
  ): Promise<ISupervisor> {
    return (await this.prisma.supervisor.create({
      data: {
        capacity: payload.capacity,
        account: { connect: payload.account },
        field: { connect: payload.field },
        specializations: { connect: payload.specializations },
      },
      select: this.defaultSelect,
    })) as ISupervisor;
  }

  async registerSupervisor(
    payload: IRegisterSupervisorPayload
  ): Promise<ISupervisor> {
    return (await this.prisma.supervisor.create({
      data: {
        capacity: payload.capacity,
        account: { connect: payload.account },
      },
      select: this.defaultSelect,
    })) as ISupervisor;
  }

  async updateSupervisor(
    by: Prisma.SupervisorWhereUniqueInput,
    payload: IUpdateSupervisorPayload
  ): Promise<ISupervisor> {
    return (await this.prisma.supervisor.update({
      where: {
        id: by.id,
        accountId: by.accountId,
      },
      data: {
        capacity: payload.capacity,
        field: { connect: payload.field },
        specializations: { set: payload.specializations },
      },
      select: this.defaultSelect,
    })) as ISupervisor;
  }

  async deleteSupervisor(by: Prisma.SupervisorWhereUniqueInput): Promise<void> {
    await this.prisma.supervisor.delete({
      where: {
        id: by.id,
        accountId: by.accountId,
      },
    });
  }
}
