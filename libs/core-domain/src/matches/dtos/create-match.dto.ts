import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';
import {
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '../payload/create-match.payload';

export class MatchSingleStudentBody implements IMatchSingleStudentPayload {
  @IsUUID()
  @ApiProperty()
  studentId: string;
}

export class MatchSelectedStudentsBody
  implements IMatchSelectedStudentsPayload
{
  @IsUUID('4', { each: true })
  @ApiProperty()
  studentIds: string[];
}

export class MatchSelectedStudentsAndSupervisorsBody
  implements IMatchSelectedStudentsAndSupervisorsPayload
{
  @IsUUID('4', { each: true })
  @ApiProperty()
  studentIds: string[];

  @IsUUID('4', { each: true })
  @ApiProperty()
  supervisorIds: string[];
}
