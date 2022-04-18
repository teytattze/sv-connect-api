const BASE_SERVICE = 'invitations';

const INDEX_INVITATIONS = {
  service: BASE_SERVICE,
  operationId: 'indexInvitations',
};

const CREATE_INVITATION = {
  service: BASE_SERVICE,
  operationId: 'createInvitation',
};

const ACCEPT_INVITATION_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'acceptInvitationById',
};

const BULK_REJECT_INVITATIONS_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'bulkRejectInvitationsById',
};

const REJECT_INVITATION_BY_ID = {
  service: BASE_SERVICE,
  operationId: 'rejectInvitationById',
};

export const InvitationsPattern = {
  INDEX_INVITATIONS,
  CREATE_INVITATION,
  ACCEPT_INVITATION_BY_ID,
  BULK_REJECT_INVITATIONS_BY_ID,
  REJECT_INVITATION_BY_ID,
};
