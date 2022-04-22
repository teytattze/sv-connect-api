import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { SupervisorsCode } from '@sv-connect/core-common';
import {
  ICreateSupervisorPayload,
  IIndexSupervisorsFilter,
  IRegisterSupervisorPayload,
  ISupervisor,
  ISupervisorsService,
  IUpdateSupervisorPayload,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { handlePrismaError } from './supervisors.helper';
import { SupervisorsRepository } from './supervisors.repository';

@Injectable()
export class SupervisorsService implements ISupervisorsService {
  constructor(private readonly supervisorsRepository: SupervisorsRepository) {}

  async indexSupervisors(
    filter?: IIndexSupervisorsFilter
  ): Promise<ISupervisor[]> {
    const where = this.mapFilterToPrismaWhere(filter);
    const [error, supervisors] = await to<ISupervisor[], any>(
      this.supervisorsRepository.findSupervisors(where)
    );
    if (error) handlePrismaError(error);
    return supervisors;
  }

  async getSupervisorById(id: string): Promise<ISupervisor> {
    const [error, supervisor] = await to<ISupervisor, any>(
      this.supervisorsRepository.findSupervisor({ id })
    );
    if (error) handlePrismaError(error);
    if (!supervisor)
      throw new RpcException(SupervisorsCode.SUPERVISOR_NOT_FOUND);
    return supervisor;
  }

  async getSupervisorByAccountId(accountId: string): Promise<ISupervisor> {
    const [error, supervisor] = await to<ISupervisor, any>(
      this.supervisorsRepository.findSupervisor({ accountId })
    );
    if (error) handlePrismaError(error);
    if (!supervisor)
      throw new RpcException(SupervisorsCode.SUPERVISOR_NOT_FOUND);
    return supervisor;
  }

  async createSupervisor(
    payload: ICreateSupervisorPayload
  ): Promise<ISupervisor> {
    const [error, supervisor] = await to<ISupervisor, any>(
      this.supervisorsRepository.createSupervisor(payload)
    );
    if (error) handlePrismaError(error);
    return supervisor;
  }

  async registerSupervisor(
    payload: IRegisterSupervisorPayload
  ): Promise<ISupervisor> {
    const [error, supervisor] = await to<ISupervisor, any>(
      this.supervisorsRepository.registerSupervisor(payload)
    );
    if (error) handlePrismaError(error);
    return supervisor;
  }

  async updateSupervisorById(
    id: string,
    payload: IUpdateSupervisorPayload
  ): Promise<ISupervisor> {
    const [error, supervisor] = await to<ISupervisor, any>(
      this.supervisorsRepository.updateSupervisor({ id }, payload)
    );
    if (error) handlePrismaError(error);
    return supervisor;
  }

  async updateSupervisorByAccountId(
    accountId: string,
    payload: IUpdateSupervisorPayload
  ): Promise<ISupervisor> {
    const [error, supervisor] = await to<ISupervisor, any>(
      this.supervisorsRepository.updateSupervisor({ accountId }, payload)
    );
    if (error) handlePrismaError(error);
    return supervisor;
  }

  async deleteSupervisorById(id: string): Promise<void> {
    const [error] = await to<void, any>(
      this.supervisorsRepository.deleteSupervisor({ id })
    );
    if (error) handlePrismaError(error);
  }

  private mapFilterToPrismaWhere(
    filter?: IIndexSupervisorsFilter
  ): Prisma.SupervisorWhereInput {
    const result: Prisma.SupervisorWhereInput = {
      capacity: {},
      fieldId: {},
      specializations: {},
    };

    if (filter?.maxCapacity) {
      result.capacity = {
        ...(result.capacity as Prisma.IntFilter),
        lte: filter.maxCapacity,
      };
    }
    if (filter?.minCapacity) {
      result.capacity = {
        ...(result.capacity as Prisma.IntFilter),
        gte: filter.minCapacity,
      };
    }
    if (filter?.fieldId) {
      result.fieldId = {
        ...(result.fieldId as Prisma.StringFilter),
        equals: filter.fieldId,
      };
    }
    return result;
  }
}
