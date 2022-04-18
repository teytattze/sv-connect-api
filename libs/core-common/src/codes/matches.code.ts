import { BaseServiceCode, HttpStatus } from '../enums';
import { ICode } from './interface.code';

const ERROR_PREFIX = BaseServiceCode.MATCHES;

export class MatchesCode {
  public static SUPERVISOR_NOT_AVAILABLE: ICode = {
    statusCode: HttpStatus.BAD_REQUEST,
    errorCode: `${ERROR_PREFIX}000`,
    message: 'Supervisor not available',
  };
}
