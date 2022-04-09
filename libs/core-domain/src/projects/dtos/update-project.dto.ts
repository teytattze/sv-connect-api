import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ConnectFieldBody,
  ConnectSpecializationBody,
} from '@sv-connect/core-common';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { IUpdateProjectPayload } from '../payloads/update-project.payload';

export class UpdateProjectBody implements IUpdateProjectPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  summary?: string;

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

export class UpdateProjectByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
