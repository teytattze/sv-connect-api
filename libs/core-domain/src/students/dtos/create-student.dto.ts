import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ConnectAccountBody,
  ConnectSupervisorBody,
} from '@sv-connect/core-common';
import { Type } from 'class-transformer';
import { IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { ICreateStudentPayload } from '../payloads/create-student.payload';

export class CreateStudentBody implements ICreateStudentPayload {
  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectAccountBody)
  @ApiProperty({ type: ConnectAccountBody })
  account: ConnectAccountBody;

  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectSupervisorBody)
  @ApiPropertyOptional({ type: ConnectSupervisorBody })
  supervisor?: ConnectSupervisorBody;
}
