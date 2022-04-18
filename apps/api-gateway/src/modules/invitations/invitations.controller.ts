import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoreHttpResponse } from '@sv-connect/core-common';
import {
  AcceptInvitationByIdParam,
  BulkRejectInvitationsByIdBody,
  CreateInvitationBody,
  IndexInvitationsQuery,
  InvitationDto,
  RejectInvitationByIdParam,
} from '@sv-connect/core-domain';
import { InvitationsService } from './invitations.service';

@ApiTags('Invitations')
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Get()
  async indexInvitations(
    @Query() query: IndexInvitationsQuery
  ): Promise<CoreHttpResponse<InvitationDto[]>> {
    const { data } = await this.invitationsService.indexInvitations(query);
    return CoreHttpResponse.success({ data });
  }

  @Post('create')
  async createInvitation(
    @Body() body: CreateInvitationBody
  ): Promise<CoreHttpResponse<InvitationDto>> {
    const { data } = await this.invitationsService.createInvitation(body);
    return CoreHttpResponse.success({ data });
  }

  @Put('accept/:id')
  async acceptInvitationById(
    @Param() { id }: AcceptInvitationByIdParam
  ): Promise<CoreHttpResponse<InvitationDto>> {
    const { data } = await this.invitationsService.acceptInvitationById(id);
    return CoreHttpResponse.success({ data });
  }

  @Put('bulk/reject')
  async bulkRejectInvitationsById(
    @Body() body: BulkRejectInvitationsByIdBody
  ): Promise<CoreHttpResponse<InvitationDto[]>> {
    const { data } = await this.invitationsService.bulkRejectInvitationsById(
      body
    );
    return CoreHttpResponse.success({ data });
  }

  @Put('reject/:id')
  async rejectInvitationById(
    @Param() { id }: RejectInvitationByIdParam
  ): Promise<CoreHttpResponse<InvitationDto>> {
    const { data } = await this.invitationsService.rejectInvitationById(id);
    return CoreHttpResponse.success({ data });
  }
}
