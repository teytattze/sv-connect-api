import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConnectSpecializationBody } from '@sv-connect/core-common';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { IUpdateFieldPayload } from '../payloads/update-field.payload';

export class UpdateFieldBody implements IUpdateFieldPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectSpecializationBody)
  @ApiPropertyOptional({ type: ConnectSpecializationBody, isArray: true })
  specializations?: ConnectSpecializationBody[];
}

export class UpdateFieldByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
