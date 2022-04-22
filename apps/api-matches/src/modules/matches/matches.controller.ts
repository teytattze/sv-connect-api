import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MatchesPattern } from '@sv-connect/app-common';
import { CoreServiceResponse } from '@sv-connect/core-common';
import {
  IAcceptMatchesPayload,
  IMatch,
  IMatchesClient,
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
  IStudent,
} from '@sv-connect/core-domain';
import { MatchesService } from './matches.service';

@Controller()
export class MatchesController implements IMatchesClient {
  constructor(private readonly matchesService: MatchesService) {}

  @MessagePattern(MatchesPattern.ACCEPT_MATCHES)
  async acceptMatches(
    @Payload('data') { matches }: IAcceptMatchesPayload
  ): Promise<CoreServiceResponse<IStudent[]>> {
    const students = await this.matchesService.acceptMatches({ matches });
    return CoreServiceResponse.success({ data: students });
  }

  @MessagePattern(MatchesPattern.MATCH_SINGLE_STUDENT)
  async matchSingleStudent(
    @Payload('data') { studentId }: IMatchSingleStudentPayload
  ): Promise<CoreServiceResponse<IMatch>> {
    const matchResult = await this.matchesService.matchSingleStudent({
      studentId,
    });
    return CoreServiceResponse.success({ data: matchResult });
  }

  @MessagePattern(MatchesPattern.MATCH_SELECTED_STUDENTS)
  async matchSelectedStudents(
    @Payload('data') { studentIds }: IMatchSelectedStudentsPayload
  ): Promise<CoreServiceResponse<IMatch[]>> {
    const matchResult = await this.matchesService.matchSelectedStudents({
      studentIds,
    });
    return CoreServiceResponse.success({ data: matchResult });
  }

  @MessagePattern(MatchesPattern.MATCH_SELECTED_STUDENTS_AND_SUPERVISORS)
  async matchSelectedStudentsAndSupervisors(
    @Payload('data')
    { studentIds, supervisorIds }: IMatchSelectedStudentsAndSupervisorsPayload
  ): Promise<CoreServiceResponse<IMatch[]>> {
    const matchResult =
      await this.matchesService.matchSelectedStudentsAndSupervisors({
        studentIds,
        supervisorIds,
      });
    return CoreServiceResponse.success({ data: matchResult });
  }
}
