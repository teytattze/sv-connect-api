import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ConnectAccountBody,
  ConnectFieldBody,
  ConnectSpecializationBody,
} from '@sv-connect/core-common';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import {
  ICreateSupervisorPayload,
  IRegisterSupervisorPayload,
} from '../payloads/create-supervisor.payload';

export class CreateSupervisorBody implements ICreateSupervisorPayload {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  capacity?: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectAccountBody)
  @ApiProperty({ type: ConnectAccountBody })
  account: ConnectAccountBody;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectFieldBody)
  @ApiProperty({ type: ConnectFieldBody })
  field: ConnectFieldBody;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectSpecializationBody)
  @ApiProperty({ isArray: true, type: ConnectSpecializationBody })
  specializations: ConnectSpecializationBody[];
}

export class RegisterSupervisorBody implements IRegisterSupervisorPayload {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  capacity?: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => ConnectAccountBody)
  @ApiProperty({ type: ConnectAccountBody })
  account: ConnectAccountBody;
}
