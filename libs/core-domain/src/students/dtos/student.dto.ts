import { ApiProperty } from '@nestjs/swagger';
import { BaseDto, Nullable } from '@sv-connect/core-common';
import { ProjectDto } from '../../projects';
import { IStudent } from '../interfaces/student.interface';

export class StudentDto extends BaseDto implements IStudent {
  @ApiProperty()
  accountId: string;

  @ApiProperty()
  supervisorId: Nullable<string>;
}

export class StudentWithProjectDto extends StudentDto {
  @ApiProperty({ type: ProjectDto })
  project: Nullable<ProjectDto>;
}
