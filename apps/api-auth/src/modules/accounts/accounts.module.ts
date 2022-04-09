import { Module } from '@nestjs/common';
import { AdminAccountsService } from './accounts.admin.service';
import { AccountsService } from './accounts.service';

@Module({
  providers: [AccountsService, AdminAccountsService],
  exports: [AccountsService, AdminAccountsService],
})
export class AccountsModule {}
