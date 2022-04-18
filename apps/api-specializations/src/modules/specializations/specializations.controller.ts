import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SpecializationsPattern } from '@sv-connect/app-common';
import { CoreServiceResponse } from '@sv-connect/core-common';
import {
  ICreateSpecializationPayload,
  ISpecializationsClient,
  ISpecialization,
  IUpdateSpecializationPayload,
} from '@sv-connect/core-domain';
import { IBulkDeleteSpecializationsByIdPayload } from 'libs/core-domain/src/specializations';
import { SpecializationsService } from './specializations.service';

@Controller()
export class SpecializationsController implements ISpecializationsClient {
  constructor(
    private readonly specializationsService: SpecializationsService
  ) {}

  @MessagePattern(SpecializationsPattern.INDEX_SPECIALIZATIONS)
  async indexSpecializations(): Promise<
    CoreServiceResponse<ISpecialization[]>
  > {
    const specializations =
      await this.specializationsService.indexSpecializations();
    return CoreServiceResponse.success({ data: specializations });
  }

  @MessagePattern(SpecializationsPattern.GET_SPECIALIZATION_BY_ID)
  async getSpecializationById(
    @Payload('id') id: string
  ): Promise<CoreServiceResponse<ISpecialization>> {
    const specialization =
      await this.specializationsService.getSpecializationById(id);
    return CoreServiceResponse.success({ data: specialization });
  }

  @MessagePattern(SpecializationsPattern.CREATE_SPECIALIZATION)
  async createSpecialization(
    @Payload('data') payload: ICreateSpecializationPayload
  ): Promise<CoreServiceResponse<ISpecialization>> {
    const specialization =
      await this.specializationsService.createSpecialization(payload);
    return CoreServiceResponse.success({ data: specialization });
  }

  @MessagePattern(SpecializationsPattern.UPDATE_SPECIALIZATION_BY_ID)
  async updateSpecializationById(
    @Payload('id') id: string,
    @Payload('data') payload: IUpdateSpecializationPayload
  ): Promise<CoreServiceResponse<ISpecialization>> {
    const specialization =
      await this.specializationsService.updateSpecializationById(id, payload);
    return CoreServiceResponse.success({ data: specialization });
  }

  @MessagePattern(SpecializationsPattern.BULK_DELETE_SPECIALIZATIONS_BY_ID)
  async bulkDeleteSpecializationsById(
    @Payload('data') payload: IBulkDeleteSpecializationsByIdPayload
  ): Promise<CoreServiceResponse<null>> {
    await this.specializationsService.bulkDeleteSpecializationsById(payload);
    return CoreServiceResponse.success({
      message: 'Specialization deleted successfully',
    });
  }

  @MessagePattern(SpecializationsPattern.DELETE_SPECIALIZATION_BY_ID)
  async deleteSpecializationById(
    @Payload('id') id: string
  ): Promise<CoreServiceResponse<null>> {
    await this.specializationsService.deleteSpecializationById(id);
    return CoreServiceResponse.success({
      message: 'Specialization deleted successfully',
    });
  }
}
