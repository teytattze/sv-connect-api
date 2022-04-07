import { ApiProperty } from '@nestjs/swagger';
import { Account, AccountRole } from '@prisma/client';
import { BaseEntity } from '@sv-connect/core-common';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';

export class AccountEntity extends BaseEntity implements Account {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsBoolean()
  @ApiProperty()
  emailVerified: boolean;

  @IsString()
  @ApiProperty()
  password: string;

  @IsEnum(AccountRole)
  @ApiProperty()
  role: AccountRole;
}
