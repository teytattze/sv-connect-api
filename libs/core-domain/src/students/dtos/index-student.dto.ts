import { ApiPropertyOptional } from '@nestjs/swagger';
import { ToBoolean } from '@sv-connect/app-common';
import { IsOptional, IsUUID } from 'class-validator';
import { IIndexStudentFilter } from '../payloads/index-student.payload';

export class IndexStudentQuery implements IIndexStudentFilter {
  @IsOptional()
  @ToBoolean()
  @ApiPropertyOptional()
  hasProject?: boolean;

  @IsOptional()
  @ToBoolean()
  @ApiPropertyOptional()
  hasSupervisor?: boolean;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional()
  supervisorId?: string;
}
