import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConnectSupervisorBody } from '@sv-connect/core-common';
import { Type } from 'class-transformer';
import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { IUpdateStudentPayload } from '../payloads/update-student.payload';

export class UpdateStudentBody implements IUpdateStudentPayload {
  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectSupervisorBody)
  @ApiPropertyOptional({ type: ConnectSupervisorBody })
  supervisor?: ConnectSupervisorBody;
}

export class UpdateStudentByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class UpdateStudentByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  accountId: string;
}
