import { Controller } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InvitationsPattern } from '@sv-connect/app-common';
import { CoreServiceResponse } from '@sv-connect/core-common';
import {
  ICreateInvitationPayload,
  IInvitation,
  IInvitationsClient,
} from '@sv-connect/core-domain';

@Controller()
export class InvitationsController implements IInvitationsClient {
  constructor(private readonly invitationsService: InvitationsService) {}

  @MessagePattern(InvitationsPattern.CREATE_INVITATION)
  async createInvitation(
    @Payload('data') payload: ICreateInvitationPayload
  ): Promise<CoreServiceResponse<IInvitation>> {
    const invitation = await this.invitationsService.createInvitation(payload);
    return CoreServiceResponse.success({ data: invitation });
  }

  @MessagePattern(InvitationsPattern.ACCEPT_INVITATION_BY_ID)
  async acceptInvitationById(
    @Payload('id') id: string
  ): Promise<CoreServiceResponse<IInvitation>> {
    const invitation = await this.invitationsService.acceptInvitationById(id);
    return CoreServiceResponse.success({ data: invitation });
  }

  @MessagePattern(InvitationsPattern.REJECT_INVITATION_BY_ID)
  async rejectInvitationById(
    @Payload('id') id: string
  ): Promise<CoreServiceResponse<IInvitation>> {
    const invitation = await this.invitationsService.rejectInvitationById(id);
    return CoreServiceResponse.success({ data: invitation });
  }
}
