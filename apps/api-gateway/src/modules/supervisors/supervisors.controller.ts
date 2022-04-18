import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoreHttpResponse } from '@sv-connect/core-common';
import {
  CreateSupervisorBody,
  GetSupervisorByAccountIdParam,
  IndexSupervisorsQuery,
  SupervisorDto,
  UpdateSupervisorBody,
  UpdateSupervisorByIdParam,
} from '@sv-connect/core-domain';
import { SupervisorsService } from './supervisors.service';

@ApiTags('Supervisors')
@Controller('supervisors')
export class SupervisorsController {
  constructor(private readonly supervisorsService: SupervisorsService) {}

  @Get()
  async indexSupervisors(
    @Query() query: IndexSupervisorsQuery
  ): Promise<CoreHttpResponse<SupervisorDto[]>> {
    const { data } = await this.supervisorsService.indexSupervisors(query);
    return CoreHttpResponse.success({ data });
  }

  @Post('create')
  async createSupervisor(
    @Body() body: CreateSupervisorBody
  ): Promise<CoreHttpResponse<SupervisorDto>> {
    const { data } = await this.supervisorsService.createSupervisor(body);
    return CoreHttpResponse.success({ data });
  }

  @Get('accounts/:accountId')
  async getSupervisorByAccountId(
    @Param() { accountId }: GetSupervisorByAccountIdParam
  ): Promise<CoreHttpResponse<SupervisorDto>> {
    const { data } = await this.supervisorsService.getSupervisorByAccountId(
      accountId
    );
    return CoreHttpResponse.success({ data });
  }

  @Put('update/:id')
  async updateSupervisor(
    @Param() { id }: UpdateSupervisorByIdParam,
    @Body() body: UpdateSupervisorBody
  ) {
    const { data } = await this.supervisorsService.updateSupervisorById(
      id,
      body
    );
    return CoreHttpResponse.success({ data });
  }
}
