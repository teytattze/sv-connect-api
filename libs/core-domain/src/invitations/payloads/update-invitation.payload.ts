import { InvitationStatus } from '@prisma/client';

export interface IUpdateInvitationPayload {
  message?: string;
  status?: InvitationStatus;
}

export interface IBulkRejectInvitationsByIdPayload {
  ids: string[];
}
