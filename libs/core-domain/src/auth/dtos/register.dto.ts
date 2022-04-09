import { ApiProperty } from '@nestjs/swagger';
import { AccountRole } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { IRegisterPayload } from '../payloads/register.payload';

export class RegisterBody implements IRegisterPayload {
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsEnum(AccountRole)
  @ApiProperty({ enum: AccountRole })
  role: AccountRole;
}
