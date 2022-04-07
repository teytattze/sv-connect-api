import {
  IConnectAccountPayload,
  IConnectFieldPayload,
  IConnectSpecializationPayload,
} from '@sv-connect/core-common';

export interface ICreateSupervisorPayload {
  capacity?: number;
  account: IConnectAccountPayload;
  field: IConnectFieldPayload;
  specializations: IConnectSpecializationPayload[];
}
