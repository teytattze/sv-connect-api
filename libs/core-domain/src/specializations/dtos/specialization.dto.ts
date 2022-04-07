import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '@sv-connect/core-common';
import { FieldEntity } from '../../fields';
import { ISpecialization } from '../interfaces/specialization.interface';

export class SpecializationDto extends BaseDto implements ISpecialization {
  @ApiProperty()
  title: string;

  @ApiProperty({ isArray: true, type: FieldEntity })
  fields: FieldEntity[];
}
