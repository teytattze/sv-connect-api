import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  UpdateManySpecializationsRelationBody,
  UpdateOneFieldRelationBody,
} from '@sv-connect/core-common';
import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
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
  @Type(() => UpdateOneFieldRelationBody)
  @ApiPropertyOptional({ type: UpdateOneFieldRelationBody })
  field?: UpdateOneFieldRelationBody;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateManySpecializationsRelationBody)
  @ApiPropertyOptional({ type: UpdateManySpecializationsRelationBody })
  specializations?: UpdateManySpecializationsRelationBody;
}

export class UpdateProjectByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
