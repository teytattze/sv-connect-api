import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { StudentsPattern, STUDENTS_CLIENT } from '@sv-connect/app-common';
import {
  CoreRpcException,
  ICoreServiceResponse,
} from '@sv-connect/core-common';
import {
  ICreateStudentPayload,
  IStudent,
  IStudentsClient,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StudentsService implements IStudentsClient {
  constructor(@Inject(STUDENTS_CLIENT) private readonly client: ClientProxy) {}

  async createStudent(
    payload: ICreateStudentPayload
  ): Promise<ICoreServiceResponse<IStudent>> {
    const [error, response] = await to<
      ICoreServiceResponse<IStudent>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(StudentsPattern.CREATE_STUDENT, { data: payload })
      )
    );
    if (error) throw CoreRpcException.new(error);
    return response;
  }
}
