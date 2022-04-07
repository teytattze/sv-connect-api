import { IConnectSpecializationPayload } from '@sv-connect/core-common';

export interface ICreateFieldPayload {
  title: string;
  specializations?: IConnectSpecializationPayload[];
}
