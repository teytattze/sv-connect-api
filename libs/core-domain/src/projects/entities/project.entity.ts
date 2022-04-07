import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@prisma/client';
import { BaseEntity } from '@sv-connect/core-common';
import { IsString, IsUUID } from 'class-validator';

export class ProjectEntity extends BaseEntity implements Project {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  summary: string;

  @IsUUID()
  @ApiProperty()
  studentId: string;

  @IsUUID()
  @ApiProperty()
  fieldId: string;
}
