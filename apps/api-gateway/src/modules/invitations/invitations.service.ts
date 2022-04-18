import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { INVITATIONS_CLIENT, InvitationsPattern } from '@sv-connect/app-common';
import {
  CoreHttpException,
  ICoreServiceResponse,
} from '@sv-connect/core-common';
import {
  IBulkRejectInvitationsByIdPayload,
  ICreateInvitationPayload,
  IIndexInvitationFilterPayload,
  IInvitation,
  IInvitationsClient,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class InvitationsService implements IInvitationsClient {
  constructor(
    @Inject(INVITATIONS_CLIENT) private readonly client: ClientProxy
  ) {}

  async indexInvitations(
    by?: IIndexInvitationFilterPayload
  ): Promise<ICoreServiceResponse<IInvitation[]>> {
    const [error, response] = await to<
      ICoreServiceResponse<IInvitation[]>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(InvitationsPattern.INDEX_INVITATIONS, { by })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async createInvitation(
    payload: ICreateInvitationPayload
  ): Promise<ICoreServiceResponse<IInvitation>> {
    const [error, response] = await to<
      ICoreServiceResponse<IInvitation>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(InvitationsPattern.CREATE_INVITATION, {
          data: payload,
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async acceptInvitationById(
    id: string
  ): Promise<ICoreServiceResponse<IInvitation>> {
    const [error, invitation] = await to<
      ICoreServiceResponse<IInvitation>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(InvitationsPattern.ACCEPT_INVITATION_BY_ID, { id })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return invitation;
  }

  async bulkRejectInvitationsById(
    payload: IBulkRejectInvitationsByIdPayload
  ): Promise<ICoreServiceResponse<IInvitation[]>> {
    const [error, response] = await to<
      ICoreServiceResponse<IInvitation[]>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(InvitationsPattern.BULK_REJECT_INVITATIONS_BY_ID, {
          data: payload,
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async rejectInvitationById(
    id: string
  ): Promise<ICoreServiceResponse<IInvitation>> {
    const [error, invitation] = await to<
      ICoreServiceResponse<IInvitation>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(InvitationsPattern.REJECT_INVITATION_BY_ID, { id })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return invitation;
  }
}
