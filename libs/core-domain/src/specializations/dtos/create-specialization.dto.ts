import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConnectFieldBody } from '@sv-connect/core-common';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ICreateSpecializationPayload } from '../payloads/create-specialization.payload';

export class CreateSpecializationBody implements ICreateSpecializationPayload {
  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectFieldBody)
  @ApiPropertyOptional({ isArray: true, type: ConnectFieldBody })
  fields?: ConnectFieldBody[];
}
