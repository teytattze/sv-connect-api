import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MatchesPattern, MATCHES_CLIENT } from '@sv-connect/app-common';
import {
  CoreHttpException,
  ICoreServiceResponse,
} from '@sv-connect/core-common';
import {
  IAcceptMatchesPayload,
  IMatch,
  IMatchesClient,
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
  IStudent,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MatchesService implements IMatchesClient {
  constructor(@Inject(MATCHES_CLIENT) private readonly client: ClientProxy) {}

  async acceptMatches(
    payload: IAcceptMatchesPayload
  ): Promise<ICoreServiceResponse<IStudent[]>> {
    const [error, response] = await to<
      ICoreServiceResponse<IStudent[]>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(MatchesPattern.ACCEPT_MATCHES, {
          data: payload,
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async matchSingleStudent({
    studentId,
  }: IMatchSingleStudentPayload): Promise<ICoreServiceResponse<IMatch>> {
    const [error, response] = await to<
      ICoreServiceResponse<IMatch>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(MatchesPattern.MATCH_SINGLE_STUDENT, {
          data: { studentId },
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async matchSelectedStudents({
    studentIds,
  }: IMatchSelectedStudentsPayload): Promise<ICoreServiceResponse<IMatch[]>> {
    const [error, response] = await to<
      ICoreServiceResponse<IMatch[]>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(MatchesPattern.MATCH_SELECTED_STUDENTS, {
          data: { studentIds },
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async matchSelectedStudentsAndSupervisors({
    studentIds,
    supervisorIds,
  }: IMatchSelectedStudentsAndSupervisorsPayload): Promise<
    ICoreServiceResponse<IMatch[]>
  > {
    const [error, response] = await to<
      ICoreServiceResponse<IMatch[]>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(
          MatchesPattern.MATCH_SELECTED_STUDENTS_AND_SUPERVISORS,
          {
            data: {
              studentIds,
              supervisorIds,
            },
          }
        )
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }
}
