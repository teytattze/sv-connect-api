import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccountRole } from '@prisma/client';
import { BaseDto } from '@sv-connect/core-common';
import { IAccount } from '../interfaces/account.interface';

export class AccountDto extends BaseDto implements IAccount {
  @ApiProperty()
  email: string;

  @ApiProperty()
  emailVerified: boolean;

  @ApiPropertyOptional()
  password?: string;

  @ApiProperty()
  role: AccountRole;
}
