import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { IIndexSupervisorsFilter } from '../payloads/index-supervisors.payload';

export class IndexSupervisorsQuery implements IIndexSupervisorsFilter {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  fieldId?: string;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  maxCapacity?: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  minCapacity?: number;
}
