import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { IAcceptMatchesPayload } from '../payload/accept-matches.payload';
import { MatchDto } from './match.dto';

export class AcceptMatchesBody implements IAcceptMatchesPayload {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MatchDto)
  @ApiProperty({ type: MatchDto, isArray: true })
  matches: MatchDto[];
}
