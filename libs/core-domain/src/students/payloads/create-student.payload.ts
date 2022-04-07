import {
  IConnectAccountPayload,
  IConnectSupervisorPayload,
} from '@sv-connect/core-common';

export interface ICreateStudentPayload {
  account: IConnectAccountPayload;
  supervisor?: IConnectSupervisorPayload;
}
