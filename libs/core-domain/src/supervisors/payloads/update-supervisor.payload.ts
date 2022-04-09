import {
  IConnectFieldPayload,
  IConnectSpecializationPayload,
} from '@sv-connect/core-common';

export interface IUpdateSupervisorPayload {
  capacity?: number;
  field?: IConnectFieldPayload;
  specializations?: IConnectSpecializationPayload[];
}
