import {
  IConnectFieldPayload,
  IConnectSpecializationPayload,
  IConnectStudentPayload,
} from '@sv-connect/core-common';

export interface ICreateProjectPayload {
  title: string;
  summary: string;
  field: IConnectFieldPayload;
  specializations: IConnectSpecializationPayload[];
  student: IConnectStudentPayload;
}
