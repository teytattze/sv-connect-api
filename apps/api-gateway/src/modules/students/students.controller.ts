import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoreHttpResponse } from '@sv-connect/core-common';
import {
  CreateStudentBody,
  GetStudentByAccountIdParam,
  StudentDto,
} from '@sv-connect/core-domain';
import { StudentsService } from './students.service';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('create')
  async createStudent(
    @Body() body: CreateStudentBody
  ): Promise<CoreHttpResponse<StudentDto>> {
    const { data } = await this.studentsService.createStudent(body);
    return CoreHttpResponse.success({ data });
  }

  @Get('accounts/:accountId')
  async getStudentByAccountId(
    @Param() { accountId }: GetStudentByAccountIdParam
  ): Promise<CoreHttpResponse<StudentDto>> {
    const { data } = await this.studentsService.getStudentByAccountId(
      accountId
    );
    return CoreHttpResponse.success({ data });
  }
}
