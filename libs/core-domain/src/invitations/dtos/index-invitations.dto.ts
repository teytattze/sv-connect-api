import { InvitationStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { IIndexInvitationFilter } from '../payloads/index-invitations.payload';

export class IndexInvitationsQuery implements IIndexInvitationFilter {
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
