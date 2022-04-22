import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SupervisorsPattern } from '@sv-connect/app-common';
import { CoreServiceResponse } from '@sv-connect/core-common';
import {
  ICreateSupervisorPayload,
  IIndexSupervisorsFilter,
  IRegisterSupervisorPayload,
  ISupervisor,
  ISupervisorsClient,
  IUpdateSupervisorPayload,
} from '@sv-connect/core-domain';
import { SupervisorsService } from './supervisors.service';

@Controller()
export class SupervisorsController implements ISupervisorsClient {
  constructor(private readonly supervisorsService: SupervisorsService) {}

  @MessagePattern(SupervisorsPattern.INDEX_SUPERVISORS)
  async indexSupervisors(
    @Payload('by') by?: IIndexSupervisorsFilter
  ): Promise<CoreServiceResponse<ISupervisor[]>> {
    const supervisors = await this.supervisorsService.indexSupervisors(by);
    return CoreServiceResponse.success({ data: supervisors });
  }

  @MessagePattern(SupervisorsPattern.GET_SUPERVISOR_BY_ID)
  async getSupervisorById(
    @Payload('id') id: string
  ): Promise<CoreServiceResponse<ISupervisor>> {
    const supervisor = await this.supervisorsService.getSupervisorById(id);
    return CoreServiceResponse.success({ data: supervisor });
  }

  @MessagePattern(SupervisorsPattern.GET_SUPERVISOR_BY_ACCOUNT_ID)
  async getSupervisorByAccountId(
    @Payload('accountId') accountId: string
  ): Promise<CoreServiceResponse<ISupervisor>> {
    const supervisor = await this.supervisorsService.getSupervisorByAccountId(
      accountId
    );
    return CoreServiceResponse.success({ data: supervisor });
  }

  @MessagePattern(SupervisorsPattern.CREATE_SUPERVISOR)
  async createSupervisor(
    @Payload('data') payload: ICreateSupervisorPayload
  ): Promise<CoreServiceResponse<ISupervisor>> {
    const supervisor = await this.supervisorsService.createSupervisor(payload);
    return CoreServiceResponse.success({ data: supervisor });
  }

  @MessagePattern(SupervisorsPattern.REGISTER_SUPERVISOR)
  async registerSupervisor(
    @Payload('data') payload: IRegisterSupervisorPayload
  ): Promise<CoreServiceResponse<ISupervisor>> {
    const supervisor = await this.supervisorsService.registerSupervisor(
      payload
    );
    return CoreServiceResponse.success({ data: supervisor });
  }

  @MessagePattern(SupervisorsPattern.UPDATE_SUPERVISOR_BY_ID)
  async updateSupervisorById(
    @Payload('id') id: string,
    @Payload('data') payload: IUpdateSupervisorPayload
  ): Promise<CoreServiceResponse<ISupervisor>> {
    const supervisor = await this.supervisorsService.updateSupervisorById(
      id,
      payload
    );
    return CoreServiceResponse.success({ data: supervisor });
  }

  @MessagePattern(SupervisorsPattern.UPDATE_SUPERVISOR_BY_ACCOUNT_ID)
  async updateSupervisorByAccountId(
    @Payload('accountId') accountId: string,
    @Payload('data') payload: IUpdateSupervisorPayload
  ): Promise<CoreServiceResponse<ISupervisor>> {
    const supervisor =
      await this.supervisorsService.updateSupervisorByAccountId(
        accountId,
        payload
      );
    return CoreServiceResponse.success({ data: supervisor });
  }

  @MessagePattern(SupervisorsPattern.DELETE_SUPERVISOR_BY_ID)
  async deleteSupervisorById(
    @Payload('id') id: string
  ): Promise<CoreServiceResponse<null>> {
    await this.supervisorsService.deleteSupervisorById(id);
    return CoreServiceResponse.success({
      message: 'Supervisor deleted successfully',
    });
  }
}
