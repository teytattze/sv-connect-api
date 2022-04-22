import { BaseServiceCode, HttpStatus } from '../enums';
import { ICode } from './interface.code';

const ERROR_PREFIX = BaseServiceCode.INVITATIONS;

export class InvitationsCode {
  public static INVITATION_NOT_FOUND: ICode = {
    statusCode: HttpStatus.NOT_FOUND,
    errorCode: `${ERROR_PREFIX}000`,
    message: 'Invitation not found',
  };

  public static ALREADY_HAVE_SUPERVISOR: ICode = {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: `${ERROR_PREFIX}001`,
    message: 'Create invitation failed, you already have a supervisor',
  };

  public static SUPERVISOR_CAPACITY_EXCEEDED: ICode = {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: `${ERROR_PREFIX}002`,
    message: 'Accept invitation failed, your capcity have exceeded the limit',
  };
}
