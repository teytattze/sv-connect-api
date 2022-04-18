import { ApiPropertyOptional } from '@nestjs/swagger';
import { ToBoolean } from '@sv-connect/app-common';
import { IsOptional, IsUUID } from 'class-validator';
import { IIndexStudentFilterPayload } from '../payloads/index-student.payload';

export class IndexStudentQuery implements IIndexStudentFilterPayload {
  @IsOptional()
  @ToBoolean()
  @ApiPropertyOptional()
  hasSupervisor?: boolean;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional()
  supervisorId?: string;
}
