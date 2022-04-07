import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountsPattern, ACCOUNTS_CLIENT } from '@sv-connect/app-common';
import {
  CoreRpcException,
  ICoreServiceResponse,
} from '@sv-connect/core-common';
import {
  IAccount,
  IAccountsClient,
  IUpdateAccountPayload,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccountsService implements IAccountsClient {
  constructor(@Inject(ACCOUNTS_CLIENT) private readonly client: ClientProxy) {}

  async updateAccountById(
    accountId: string,
    payload: IUpdateAccountPayload
  ): Promise<ICoreServiceResponse<IAccount>> {
    const [error, response] = await to<
      ICoreServiceResponse<IAccount>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(AccountsPattern.UPDATE_ACCOUNT_BY_ID, {
          accountId,
          data: payload,
        })
      )
    );
    if (error) throw CoreRpcException.fromService(error);
    return response;
  }
}
