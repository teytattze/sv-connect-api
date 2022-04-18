import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

export class BulkDeleteSpecializationsByIdBody {
  @IsArray()
  @ApiProperty()
  ids: string[];
}

export class DeleteSpecializationByIdParam {
  @IsUUID()
  @ApiProperty()
  id: string;
}
