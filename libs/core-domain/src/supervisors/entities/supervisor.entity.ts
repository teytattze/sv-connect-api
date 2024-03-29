import { ApiProperty } from '@nestjs/swagger';
import { Supervisor } from '@prisma/client';
import { BaseEntity } from '@sv-connect/core-common';
import { IsInt, IsUUID } from 'class-validator';

export class SupervisorEntity extends BaseEntity implements Supervisor {
  @IsInt()
  @ApiProperty()
  capacity: number;

  @IsUUID()
  @ApiProperty()
  accountId: string;

  @IsUUID()
  @ApiProperty()
  fieldId: string;
}
