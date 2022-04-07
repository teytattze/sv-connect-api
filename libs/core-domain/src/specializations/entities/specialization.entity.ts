import { ApiProperty } from '@nestjs/swagger';
import { Specialization } from '@prisma/client';
import { BaseEntity } from '@sv-connect/core-common';
import { IsString } from 'class-validator';

export class SpecializationEntity extends BaseEntity implements Specialization {
  @IsString()
  @ApiProperty()
  title: string;
}
