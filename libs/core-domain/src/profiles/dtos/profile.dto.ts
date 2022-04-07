import { ApiProperty } from '@nestjs/swagger';
import { BaseDto, Nullable } from '@sv-connect/core-common';
import { IProfile } from '../interfaces/profile.interface';

export class ProfileDto extends BaseDto implements IProfile {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  headline: Nullable<string>;

  @ApiProperty()
  summary: Nullable<string>;

  @ApiProperty()
  pictureUrl: Nullable<string>;

  @ApiProperty()
  backgroundUrl: Nullable<string>;

  @ApiProperty()
  accountId: string;
}
