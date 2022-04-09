import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ConnectSpecializationBody,
  ConnectFieldBody,
} from '@sv-connect/core-common';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { IUpdateSupervisorPayload } from '../payloads/update-supervisor.payload';

export class UpdateSupervisorBody implements IUpdateSupervisorPayload {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  capacity?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectFieldBody)
  @ApiPropertyOptional({ type: ConnectFieldBody })
  field?: ConnectFieldBody;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectSpecializationBody)
  @ApiPropertyOptional({ type: ConnectSpecializationBody, isArray: true })
  specializations?: ConnectSpecializationBody[];
}

export class UpdateSupervisorByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class UpdateSupervisorByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  accountId: string;
}
