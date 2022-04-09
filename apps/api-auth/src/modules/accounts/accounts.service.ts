import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ACCOUNTS_CLIENT, AccountsPattern } from '@sv-connect/app-common';
import {
  CoreRpcException,
  ICoreServiceResponse,
} from '@sv-connect/core-common';
import {
  IAccount,
  IAccountsClient,
  ICreateAccountPayload,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccountsService implements IAccountsClient {
  constructor(@Inject(ACCOUNTS_CLIENT) private readonly client: ClientProxy) {}

  async createAccount({
    email,
    password,
    emailVerified,
    role,
  }: ICreateAccountPayload): Promise<ICoreServiceResponse<IAccount>> {
    const [error, account] = await to<
      ICoreServiceResponse<IAccount>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(AccountsPattern.CREATE_ACCOUNT, {
          data: {
            email,
            emailVerified,
            password,
            role,
          },
        })
      )
    );
    if (error) throw CoreRpcException.fromService(error);
    return account;
  }
}
