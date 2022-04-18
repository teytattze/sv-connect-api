import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SupervisorsPattern, SUPERVISORS_CLIENT } from '@sv-connect/app-common';
import {
  CoreHttpException,
  ICoreServiceResponse,
} from '@sv-connect/core-common';
import {
  ICreateSupervisorPayload,
  IIndexSupervisorsFilterPayload,
  ISupervisor,
  ISupervisorsClient,
  IUpdateSupervisorPayload,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SupervisorsService implements ISupervisorsClient {
  constructor(
    @Inject(SUPERVISORS_CLIENT) private readonly client: ClientProxy
  ) {}

  async indexSupervisors(
    by: IIndexSupervisorsFilterPayload
  ): Promise<ICoreServiceResponse<ISupervisor[]>> {
    const [error, response] = await to<
      ICoreServiceResponse<ISupervisor[]>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SupervisorsPattern.INDEX_SUPERVISORS, { by })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async getSupervisorByAccountId(
    accountId: string
  ): Promise<ICoreServiceResponse<ISupervisor>> {
    const [error, response] = await to<
      ICoreServiceResponse<ISupervisor>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SupervisorsPattern.GET_SUPERVISOR_BY_ACCOUNT_ID, {
          accountId,
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async createSupervisor(
    payload: ICreateSupervisorPayload
  ): Promise<ICoreServiceResponse<ISupervisor>> {
    const [error, response] = await to<
      ICoreServiceResponse<ISupervisor>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SupervisorsPattern.CREATE_SUPERVISOR, {
          data: payload,
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async updateSupervisorById(
    id: string,
    payload: IUpdateSupervisorPayload
  ): Promise<ICoreServiceResponse<ISupervisor>> {
    const [error, response] = await to<
      ICoreServiceResponse<ISupervisor>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SupervisorsPattern.UPDATE_SUPERVISOR_BY_ID, {
          id,
          data: payload,
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }
}
