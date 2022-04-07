import { ApiProperty } from '@nestjs/swagger';
import { Field } from '@prisma/client';
import { BaseEntity } from '@sv-connect/core-common';
import { IsString } from 'class-validator';

export class FieldEntity extends BaseEntity implements Field {
  @IsString()
  @ApiProperty()
  title: string;
}
