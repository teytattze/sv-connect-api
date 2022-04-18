import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';
import { IBulkRejectInvitationsByIdPayload } from '../payloads/update-invitation.payload';

export class AcceptInvitationByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class BulkRejectInvitationsByIdBody
  implements IBulkRejectInvitationsByIdPayload
{
  @IsUUID('4', { each: true })
  @ApiProperty()
  ids: string[];
}

export class RejectInvitationByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
