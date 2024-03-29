import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { SpecializationsCode } from '@sv-connect/core-common';
import {
  ICreateSpecializationPayload,
  ISpecialization,
  ISpecializationsService,
  IUpdateSpecializationPayload,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { IBulkDeleteSpecializationsByIdPayload } from 'libs/core-domain/src/specializations';
import { handlePrismaError } from './specializations.helper';
import { SpecializationsRepository } from './specializations.repository';

@Injectable()
export class SpecializationsService implements ISpecializationsService {
  constructor(
    private readonly specializationsRepository: SpecializationsRepository
  ) {}

  async indexSpecializations(): Promise<ISpecialization[]> {
    const [error, specializations] = await to<ISpecialization[], any>(
      this.specializationsRepository.findSpecializations()
    );
    if (error) handlePrismaError(error);
    return specializations;
  }

  async getSpecializationById(id: string): Promise<ISpecialization> {
    const [error, specialization] = await to<ISpecialization, any>(
      this.specializationsRepository.findSpecialization({ id })
    );
    if (error) handlePrismaError(error);
    if (!specialization)
      throw new RpcException(SpecializationsCode.SPECIALIZATION_NOT_FOUND);
    return specialization;
  }

  async createSpecialization(
    payload: ICreateSpecializationPayload
  ): Promise<ISpecialization> {
    const isExisted = await this.isSpecializationExistsByTitle(payload.title);
    if (isExisted)
      throw new RpcException(SpecializationsCode.SPECIALIZATION_TITLE_EXISTS);

    const [error, specialization] = await to<ISpecialization, any>(
      this.specializationsRepository.createSpecialization(payload)
    );
    if (error) handlePrismaError(error);
    return specialization;
  }

  async updateSpecializationById(
    id: string,
    payload: IUpdateSpecializationPayload
  ): Promise<ISpecialization> {
    const [error, specialization] = await to<ISpecialization, any>(
      this.specializationsRepository.updateSpecialization({ id }, payload)
    );
    if (error) handlePrismaError(error);
    return specialization;
  }

  async bulkDeleteSpecializationsById(
    payload: IBulkDeleteSpecializationsByIdPayload
  ): Promise<void> {
    const { ids } = payload;
    const promises = ids.map((id) => this.deleteSpecializationById(id));
    await Promise.all(promises);
  }

  async deleteSpecializationById(id: string): Promise<void> {
    const [error] = await to<void, any>(
      this.specializationsRepository.deleteSpecialization({ id })
    );
    if (error) handlePrismaError(error);
  }

  async isSpecializationExistsByTitle(title: string): Promise<boolean> {
    const [error, account] = await to(
      this.specializationsRepository.findSpecialization({ title })
    );
    return error || !account ? false : true;
  }
}
