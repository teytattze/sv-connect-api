import { IAccount } from '../../accounts';
import { IRegisterPayload } from '../payloads/register.payload';
import { IAuthToken } from './auth-tokens.interface';

export interface IAuthenticationService {
  register(
    payload: IRegisterPayload
  ): Promise<IAuthToken & { account: IAccount }>;
  login(account: IAccount): Promise<IAuthToken>;
}
