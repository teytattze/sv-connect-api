import { InvitationStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { IIndexInvitationFilterPayload } from '../payloads/index-invitations.payload';

export class IndexInvitationsQuery implements IIndexInvitationFilterPayload {
  @IsOptional()
  @IsUUID()
  studentId?: string;

  @IsOptional()
  @IsUUID()
  supervisorId?: string;

  @IsOptional()
  @IsEnum(InvitationStatus)
  status?: InvitationStatus;
}
