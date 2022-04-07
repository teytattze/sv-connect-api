import { IConnectFieldPayload } from '@sv-connect/core-common';

export interface ICreateSpecializationPayload {
  title: string;
  fields?: IConnectFieldPayload[];
}
