import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoreHttpResponse } from '@sv-connect/core-common';
import {
  BulkDeleteFieldsByIdBody,
  CreateFieldBody,
  DeleteFieldByIdParam,
  FieldDto,
  GetFieldByIdParam,
  UpdateFieldBody,
  UpdateFieldByIdParam,
} from '@sv-connect/core-domain';
import { FieldsService } from './fields.service';

@ApiTags('Fields')
@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Get()
  async indexFields(): Promise<CoreHttpResponse<FieldDto[]>> {
    const { data } = await this.fieldsService.indexFields();
    return CoreHttpResponse.success({
      data,
      message: 'Fields retrieved successfully',
    });
  }

  @Post('create')
  async createField(
    @Body() body: CreateFieldBody
  ): Promise<CoreHttpResponse<FieldDto>> {
    const { data } = await this.fieldsService.createField(body);
    return CoreHttpResponse.success({
      data,
      message: 'Field created successfully',
    });
  }

  @Get(':id')
  async getFieldById(
    @Param() { id }: GetFieldByIdParam
  ): Promise<CoreHttpResponse<FieldDto>> {
    const { data } = await this.fieldsService.getFieldById(id);
    return CoreHttpResponse.success({
      data,
      message: 'Field retrieved successfully',
    });
  }

  @Put('update/:id')
  async updateFieldById(
    @Param() { id }: UpdateFieldByIdParam,
    @Body() body: UpdateFieldBody
  ): Promise<CoreHttpResponse<FieldDto>> {
    const { data } = await this.fieldsService.updateFieldById(id, body);
    return CoreHttpResponse.success({
      data,
      message: 'Field updated successfully',
    });
  }

  @Post('bulk/delete')
  async bulkDeleteFieldById(
    @Body() body: BulkDeleteFieldsByIdBody
  ): Promise<CoreHttpResponse<null>> {
    const { data } = await this.fieldsService.bulkDeleteFieldsById(body);
    return CoreHttpResponse.success({
      data,
      message: 'Fields deleted successfully',
    });
  }

  @Delete('delete/:id')
  async deleteFieldById(
    @Param() { id }: DeleteFieldByIdParam
  ): Promise<CoreHttpResponse<null>> {
    const { data } = await this.fieldsService.deleteFieldById(id);
    return CoreHttpResponse.success({
      data,
      message: 'Field deleted successfully',
    });
  }
}
