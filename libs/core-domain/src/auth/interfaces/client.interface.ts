import { ICoreServiceResponse } from '@sv-connect/core-common';
import { ILoginPayload } from '../payloads/login.payload';
import { IAuthToken } from './auth-tokens.interface';

export interface IAuthClient {
  login?(payload: ILoginPayload): Promise<ICoreServiceResponse<IAuthToken>>;
  logout?(accountId: string): Promise<ICoreServiceResponse<null>>;
}
