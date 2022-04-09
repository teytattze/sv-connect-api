import { ICoreHttpResponse } from '@sv-connect/core-common';
import { IAccount } from '../../accounts';
import { ILoginPayload } from '../payloads/login.payload';
import { IRegisterPayload } from '../payloads/register.payload';

export interface IAuthenticationClient {
  register?(payload: IRegisterPayload): Promise<ICoreHttpResponse<IAccount>>;
  login?(payload: ILoginPayload): Promise<ICoreHttpResponse<IAccount>>;
  logout?(accountId: string): Promise<ICoreHttpResponse<null>>;
}
