import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { AccountsAdminController } from './admin/accounts.admin.controller';
import { AdminAccountsService } from './admin/accounts.admin.service';
import { AdminAccountsRepository } from './admin/accounts.admin.repository';
import { StudentsModule } from '../students/students.module';
import { SupervisorsModule } from '../supervisors/supervisors.module';

@Module({
  imports: [StudentsModule, SupervisorsModule],
  controllers: [AccountsAdminController, AccountsController],
  providers: [
    AdminAccountsService,
    AdminAccountsRepository,
    AccountsService,
    AccountsRepository,
  ],
})
export class AccountsModule {}
