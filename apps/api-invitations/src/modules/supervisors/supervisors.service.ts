import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SupervisorsPattern, SUPERVISORS_CLIENT } from '@sv-connect/app-common';
import {
  CoreRpcException,
  ICoreServiceResponse,
} from '@sv-connect/core-common';
import {
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

  async getSupervisorById(
    id: string
  ): Promise<ICoreServiceResponse<ISupervisor>> {
    const [error, response] = await to<
      ICoreServiceResponse<ISupervisor>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SupervisorsPattern.GET_SUPERVISOR_BY_ID, {
          id,
        })
      )
    );
    if (error) throw CoreRpcException.fromService(error);
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
    if (error) throw CoreRpcException.fromService(error);
    return response;
  }
}
