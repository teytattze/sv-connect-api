import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoreHttpResponse } from '@sv-connect/core-common';
import {
  CreateProjectBody,
  GetProjectByIdParam,
  GetProjectByStudentIdParam,
  ProjectDto,
  UpdateProjectBody,
  UpdateProjectByIdParam,
} from '@sv-connect/core-domain';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  async createProject(
    @Body() body: CreateProjectBody
  ): Promise<CoreHttpResponse<ProjectDto>> {
    const { data } = await this.projectsService.createProject(body);
    return CoreHttpResponse.success({ data });
  }

  @Get(':id')
  async getProjectById(
    @Param() { id }: GetProjectByIdParam
  ): Promise<CoreHttpResponse<ProjectDto>> {
    const { data } = await this.projectsService.getProjectById(id);
    return CoreHttpResponse.success({ data });
  }

  @Get('students/:studentId')
  async getProjectByStudentId(
    @Param() { studentId }: GetProjectByStudentIdParam
  ) {
    const { data } = await this.projectsService.getProjectByStudentId(
      studentId
    );
    return CoreHttpResponse.success({ data });
  }

  @Put('update/:id')
  async updateProjectById(
    @Param() { id }: UpdateProjectByIdParam,
    @Body() body: UpdateProjectBody
  ): Promise<CoreHttpResponse<ProjectDto>> {
    const { data } = await this.projectsService.updateProjectById(id, body);
    return CoreHttpResponse.success({ data });
  }
}
