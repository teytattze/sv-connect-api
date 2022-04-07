import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccountsPattern } from '@sv-connect/app-common';
import { CoreServiceResponse } from '@sv-connect/core-common';
import { IAccount, IAccountsClient } from '@sv-connect/core-domain';
import { AdminAccountsService } from './accounts.admin.service';

@Controller()
export class AccountsAdminController implements IAccountsClient {
  constructor(private readonly accountsService: AdminAccountsService) {}

  @MessagePattern(AccountsPattern.ADMIN_GET_ACCOUNT_BY_EMAIL)
  async getAccountByEmail(
    @Payload('email') email: string
  ): Promise<CoreServiceResponse<IAccount>> {
    const account = await this.accountsService.getAccountByEmail(email);
    return CoreServiceResponse.success({ data: account });
  }
}
