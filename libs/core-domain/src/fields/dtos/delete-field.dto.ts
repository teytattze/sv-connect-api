import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class BulkDeleteFieldsByIdBody {
  @IsArray()
  @ApiProperty({ isArray: true })
  ids: string[];
}

export class DeleteFieldByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
