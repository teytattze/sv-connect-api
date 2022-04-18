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
  CreateSpecializationBody,
  DeleteSpecializationByIdParam,
  GetSpecializationByIdParam,
  SpecializationDto,
  UpdateSpecializationBody,
  UpdateSpecializationByIdParam,
} from '@sv-connect/core-domain';
import { BulkDeleteSpecializationsByIdBody } from 'libs/core-domain/src/specializations';
import { SpecializationsService } from './specializations.service';

@ApiTags('Specializations')
@Controller('specializations')
export class SpecializationsController {
  constructor(
    private readonly specializationsService: SpecializationsService
  ) {}

  @Get()
  async indexSpecializations(): Promise<CoreHttpResponse<SpecializationDto[]>> {
    const { data } = await this.specializationsService.indexSpecializations();
    return CoreHttpResponse.success({
      data,
      message: 'Specializations retrieved successfully',
    });
  }

  @Post('create')
  async createSpecialization(
    @Body() body: CreateSpecializationBody
  ): Promise<CoreHttpResponse<SpecializationDto>> {
    const { data } = await this.specializationsService.createSpecialization(
      body
    );
    return CoreHttpResponse.success({
      data,
      message: 'Specialization created successfully',
    });
  }

  @Get(':id')
  async getSpecializationById(
    @Param() { id }: GetSpecializationByIdParam
  ): Promise<CoreHttpResponse<SpecializationDto>> {
    const { data } = await this.specializationsService.getSpecializationById(
      id
    );
    return CoreHttpResponse.success({
      data,
      message: 'Specialization retrieved successfully',
    });
  }

  @Put('update/:id')
  async updateSpecializationById(
    @Param() { id }: UpdateSpecializationByIdParam,
    @Body() body: UpdateSpecializationBody
  ): Promise<CoreHttpResponse<SpecializationDto>> {
    const { data } = await this.specializationsService.updateSpecializationById(
      id,
      body
    );
    return CoreHttpResponse.success({
      data,
      message: 'Specialization updated successfully',
    });
  }

  @Post('bulk/delete')
  async bulkDeleteSpecializationById(
    @Body() body: BulkDeleteSpecializationsByIdBody
  ): Promise<CoreHttpResponse<null>> {
    await this.specializationsService.bulkDeleteSpecializationById(body);
    return CoreHttpResponse.success({
      message: 'Specializations deleted successfully',
    });
  }

  @Delete('delete/:id')
  async deleteSpecializationById(
    @Param() { id }: DeleteSpecializationByIdParam
  ): Promise<CoreHttpResponse<null>> {
    await this.specializationsService.deleteSpecializationById(id);
    return CoreHttpResponse.success({
      message: 'Specialization deleted successfully',
    });
  }
}
