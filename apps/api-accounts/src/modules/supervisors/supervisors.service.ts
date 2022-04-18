import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SupervisorsPattern, SUPERVISORS_CLIENT } from '@sv-connect/app-common';
import {
  CoreRpcException,
  ICoreServiceResponse,
} from '@sv-connect/core-common';
import {
  IRegisterSupervisorPayload,
  ISupervisor,
  ISupervisorsClient,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SupervisorsService implements ISupervisorsClient {
  constructor(
    @Inject(SUPERVISORS_CLIENT) private readonly client: ClientProxy
  ) {}

  async registerSupervisor(
    payload: IRegisterSupervisorPayload
  ): Promise<ICoreServiceResponse<ISupervisor>> {
    const [error, response] = await to<
      ICoreServiceResponse<ISupervisor>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(SupervisorsPattern.REGISTER_SUPERVISOR, {
          data: payload,
        })
      )
    );
    if (error) throw CoreRpcException.new(error);
    return response;
  }
}
