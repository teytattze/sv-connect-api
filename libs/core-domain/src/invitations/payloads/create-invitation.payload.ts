import { InvitationStatus } from '@prisma/client';
import {
  IConnectStudentPayload,
  IConnectSupervisorPayload,
} from '@sv-connect/core-common';

export interface ICreateInvitationPayload {
  message?: string;
  status?: InvitationStatus;
  student: IConnectStudentPayload;
  supervisor: IConnectSupervisorPayload;
}
