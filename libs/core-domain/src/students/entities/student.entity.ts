import { ApiProperty } from '@nestjs/swagger';
import { Student } from '@prisma/client';
import { BaseEntity } from '@sv-connect/core-common';
import { IsUUID } from 'class-validator';

export class StudentEntity extends BaseEntity implements Student {
  @IsUUID()
  @ApiProperty()
  accountId: string;

  @IsUUID()
  @ApiProperty()
  supervisorId: string;
}
