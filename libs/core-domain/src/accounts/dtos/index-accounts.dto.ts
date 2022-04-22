import { ApiPropertyOptional } from '@nestjs/swagger';
import { AccountRole } from '@prisma/client';
import { ToBoolean } from '@sv-connect/app-common';
import { IsEnum, IsOptional } from 'class-validator';
import { IIndexAccountsFilter } from '../payloads/index-accounts.payload';

export class IndexAccountsQuery implements IIndexAccountsFilter {
  @IsOptional()
  @ToBoolean()
  @ApiPropertyOptional()
  hasSupervisor?: boolean;

  @IsOptional()
  @IsEnum(AccountRole)
  @ApiPropertyOptional()
  role?: AccountRole;
}
