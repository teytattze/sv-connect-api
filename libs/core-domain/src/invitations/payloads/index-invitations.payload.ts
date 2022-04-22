import { InvitationStatus } from '@prisma/client';

export interface IIndexInvitationFilter {
  studentId?: string;
  supervisorId?: string;
  status?: InvitationStatus;
}
