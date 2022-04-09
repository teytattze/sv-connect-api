import {
  IConnectFieldPayload,
  IConnectSpecializationPayload,
} from '@sv-connect/core-common';

export interface IUpdateProjectPayload {
  title?: string;
  summary?: string;
  field?: IConnectFieldPayload;
  specializations?: IConnectSpecializationPayload[];
}
