import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Nullable } from '@sv-connect/core-common';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { IUpdateProfilePayload } from '../payloads/update-profile.payload';

export class UpdateProfileBody implements IUpdateProfilePayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  headline?: Nullable<string>;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  summary?: Nullable<string>;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  pictureUrl?: Nullable<string>;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  backgroundUrl?: Nullable<string>;
}

export class UpdateProfileByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}

export class UpdateProfileByAccountIdParam {
  @IsUUID()
  @ApiProperty()
  accountId: string;
}
