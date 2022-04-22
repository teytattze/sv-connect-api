import { ICoreServiceResponse } from '@sv-connect/core-common';
import { ICreateInvitationPayload } from '../payloads/create-invitation.payload';
import { IIndexInvitationFilter } from '../payloads/index-invitations.payload';
import { IBulkRejectInvitationsByIdPayload } from '../payloads/update-invitation.payload';
import { IInvitation } from './invitation.interface';

export interface IInvitationsClient {
  createInvitation?(
    payload: ICreateInvitationPayload
  ): Promise<ICoreServiceResponse<IInvitation>>;
  indexInvitations(
    by?: IIndexInvitationFilter
  ): Promise<ICoreServiceResponse<IInvitation[]>>;
  acceptInvitationById?(id: string): Promise<ICoreServiceResponse<IInvitation>>;
  bulkRejectInvitationsById?(
    payload: IBulkRejectInvitationsByIdPayload
  ): Promise<ICoreServiceResponse<IInvitation[]>>;
  rejectInvitationById?(id: string): Promise<ICoreServiceResponse<IInvitation>>;
}
