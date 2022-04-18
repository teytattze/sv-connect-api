import { InvitationStatus } from '@prisma/client';

export interface IIndexInvitationFilterPayload {
  studentId?: string;
  supervisorId?: string;
  status?: InvitationStatus;
}
