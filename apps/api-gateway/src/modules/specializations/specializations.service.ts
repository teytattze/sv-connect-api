import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  SPECIALIZATIONS_CLIENT,
  SpecializationsPattern,
} from '@sv-connect/app-common';
import {
  CoreHttpException,
  ICoreServiceResponse,
} from '@sv-connect/core-common';
import {
  ICreateSpecializationPayload,
  ISpecialization,
  ISpecializationsClient,
  IUpdateSpecializationPayload,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { IBulkDeleteSpecializationsByIdPayload } from 'libs/core-domain/src/specializations';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SpecializationsService implements ISpecializationsClient {
  constructor(
    @Inject(SPECIALIZATIONS_CLIENT) private readonly client: ClientProxy
  ) {}

  async indexSpecializations(): Promise<
    ICoreServiceResponse<ISpecialization[]>
  > {
    const [error, response] = await to<
      ICoreServiceResponse<ISpecialization[]>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SpecializationsPattern.INDEX_SPECIALIZATIONS, {})
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async getSpecializationById(
    id: string
  ): Promise<ICoreServiceResponse<ISpecialization>> {
    const [error, response] = await to<
      ICoreServiceResponse<ISpecialization>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SpecializationsPattern.GET_SPECIALIZATION_BY_ID, {
          id,
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async createSpecialization(
    payload: ICreateSpecializationPayload
  ): Promise<ICoreServiceResponse<ISpecialization>> {
    const [error, response] = await to<
      ICoreServiceResponse<ISpecialization>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SpecializationsPattern.CREATE_SPECIALIZATION, {
          data: payload,
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async updateSpecializationById(
    id: string,
    payload: IUpdateSpecializationPayload
  ): Promise<ICoreServiceResponse<ISpecialization>> {
    const [error, response] = await to<
      ICoreServiceResponse<ISpecialization>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SpecializationsPattern.UPDATE_SPECIALIZATION_BY_ID, {
          id,
          data: payload,
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async bulkDeleteSpecializationById(
    payload: IBulkDeleteSpecializationsByIdPayload
  ): Promise<ICoreServiceResponse<null>> {
    const [error, response] = await to<
      ICoreServiceResponse<null>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(
          SpecializationsPattern.BULK_DELETE_SPECIALIZATIONS_BY_ID,
          {
            data: payload,
          }
        )
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async deleteSpecializationById(
    id: string
  ): Promise<ICoreServiceResponse<null>> {
    const [error, response] = await to<
      ICoreServiceResponse<null>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SpecializationsPattern.DELETE_SPECIALIZATION_BY_ID, {
          id,
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }
}
