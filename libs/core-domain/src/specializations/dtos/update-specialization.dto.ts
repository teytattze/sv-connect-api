import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConnectFieldBody } from '@sv-connect/core-common';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { IUpdateSpecializationPayload } from '../payloads/update-specialization.payload';

export class UpdateSpecializationBody implements IUpdateSpecializationPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectFieldBody)
  @ApiPropertyOptional({ type: ConnectFieldBody, isArray: true })
  fields?: ConnectFieldBody[];
}

export class UpdateSpecializationByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
