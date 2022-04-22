import { ICoreServiceResponse } from '@sv-connect/core-common';
import { ICreateAccountPayload } from '../payloads/create-account.payload';
import { IIndexAccountsFilter } from '../payloads/index-accounts.payload';
import { IUpdateAccountPayload } from '../payloads/update-account.payload';
import { IAccount } from './account.interface';

export interface IAccountsClient {
  indexAccounts?(
    by?: IIndexAccountsFilter
  ): Promise<ICoreServiceResponse<IAccount[]>>;
  getAccountByEmail?(email: string): Promise<ICoreServiceResponse<IAccount>>;
  getAccountById?(id: string): Promise<ICoreServiceResponse<IAccount>>;
  createAccount?(
    payload: ICreateAccountPayload
  ): Promise<ICoreServiceResponse<IAccount>>;
  updateAccountById?(
    id: string,
    payload: IUpdateAccountPayload
  ): Promise<ICoreServiceResponse<IAccount>>;
  deleteAccountById?(id: string): Promise<ICoreServiceResponse<null>>;
}

export interface IAdminAccountsClient {
  getAccountByEmail?(email: string): Promise<ICoreServiceResponse<IAccount>>;
}
