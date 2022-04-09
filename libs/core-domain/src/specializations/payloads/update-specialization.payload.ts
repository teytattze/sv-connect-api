import { IConnectFieldPayload } from '@sv-connect/core-common';

export interface IUpdateSpecializationPayload {
  title?: string;
  fields?: IConnectFieldPayload[];
}
