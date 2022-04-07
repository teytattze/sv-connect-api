import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@sv-connect/core-common';
import { FieldEntity } from '../../fields';
import { SpecializationEntity } from '../../specializations';
import { IProject } from '../interfaces/project.interface';

export class ProjectDto extends BaseDto implements IProject {
  @ApiProperty()
  title: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty({ type: FieldEntity })
  field: FieldEntity;

  @ApiProperty({ isArray: true, type: SpecializationEntity })
  specializations: SpecializationEntity[];
}
