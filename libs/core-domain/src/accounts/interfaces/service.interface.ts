import { IAccount } from '../interfaces/account.interface';
import { ICreateAccountPayload } from '../payloads/create-account.payload';
import { IIndexAccountsFilter } from '../payloads/index-accounts.payload';
import { IUpdateAccountPayload } from '../payloads/update-account.payload';

export interface IAccountsService {
  indexAccounts(by?: IIndexAccountsFilter): Promise<IAccount[]>;
  getAccountByEmail(email: string): Promise<IAccount>;
  getAccountById(id: string): Promise<IAccount>;
  createAccount(payload: ICreateAccountPayload): Promise<IAccount>;
  updateAccountById(
    id: string,
    payload: IUpdateAccountPayload
  ): Promise<IAccount>;
  deleteAccountById(id: string): Promise<void>;
}

export interface IAdminAccountsService {
  getAccountByEmail(email: string): Promise<IAccount>;
}
