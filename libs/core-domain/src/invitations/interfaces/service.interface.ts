import { ICreateInvitationPayload } from '../payloads/create-invitation.payload';
import { IIndexInvitationFilter } from '../payloads/index-invitations.payload';
import { IBulkRejectInvitationsByIdPayload } from '../payloads/update-invitation.payload';
import { IInvitation } from './invitation.interface';

export interface IInvitationsService {
  createInvitation(payload: ICreateInvitationPayload): Promise<IInvitation>;
  indexInvitations(by?: IIndexInvitationFilter): Promise<IInvitation[]>;
  acceptInvitationById(id: string): Promise<IInvitation>;
  bulkRejectInvitationsById(
    payload: IBulkRejectInvitationsByIdPayload
  ): Promise<IInvitation[]>;
  rejectInvitationById(id: string): Promise<IInvitation>;
}
