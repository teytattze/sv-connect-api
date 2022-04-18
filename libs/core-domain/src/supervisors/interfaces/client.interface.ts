import { ICoreServiceResponse } from '@sv-connect/core-common';
import {
  ICreateSupervisorPayload,
  IRegisterSupervisorPayload,
} from '../payloads/create-supervisor.payload';
import { IIndexSupervisorsFilterPayload } from '../payloads/index-supervisors.payload';
import { IUpdateSupervisorPayload } from '../payloads/update-supervisor.payload';
import { ISupervisor } from './supervisor.interface';

export interface ISupervisorsClient {
  indexSupervisors?(
    by?: IIndexSupervisorsFilterPayload
  ): Promise<ICoreServiceResponse<ISupervisor[]>>;
  getSupervisorById?(id: string): Promise<ICoreServiceResponse<ISupervisor>>;
  getSupervisorByAccountId?(
    accountId: string
  ): Promise<ICoreServiceResponse<ISupervisor>>;
  createSupervisor?(
    payload: ICreateSupervisorPayload
  ): Promise<ICoreServiceResponse<ISupervisor>>;
  registerSupervisor?(
    payload: IRegisterSupervisorPayload
  ): Promise<ICoreServiceResponse<ISupervisor>>;
  updateSupervisorById?(
    id: string,
    payload: IUpdateSupervisorPayload
  ): Promise<ICoreServiceResponse<ISupervisor>>;
  updateSupervisorByAccountId?(
    accountId: string,
    payload: IUpdateSupervisorPayload
  ): Promise<ICoreServiceResponse<ISupervisor>>;
  deleteSupervisorById?(id: string): Promise<ICoreServiceResponse<null>>;
}
