import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PROJECTS_CLIENT, ProjectsPattern } from '@sv-connect/app-common';
import {
  CoreHttpException,
  ICoreServiceResponse,
} from '@sv-connect/core-common';
import {
  ICreateProjectPayload,
  IProject,
  IProjectsClient,
  IUpdateProjectPayload,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProjectsService implements IProjectsClient {
  constructor(@Inject(PROJECTS_CLIENT) private readonly client: ClientProxy) {}

  async getProjectById(id: string): Promise<ICoreServiceResponse<IProject>> {
    const [error, response] = await to<
      ICoreServiceResponse<IProject>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProjectsPattern.GET_PROJECT_BY_ID, { id })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async getProjectByStudentId(
    studentId: string
  ): Promise<ICoreServiceResponse<IProject>> {
    const [error, response] = await to<
      ICoreServiceResponse<IProject>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProjectsPattern.GET_PROJECT_BY_STUDENT_ID, {
          studentId,
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async createProject(
    payload: ICreateProjectPayload
  ): Promise<ICoreServiceResponse<IProject>> {
    const [error, response] = await to<
      ICoreServiceResponse<IProject>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProjectsPattern.CREATE_PROJECT, { data: payload })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }

  async updateProjectById(
    id: string,
    payload: IUpdateProjectPayload
  ): Promise<ICoreServiceResponse<IProject>> {
    const [error, response] = await to<
      ICoreServiceResponse<IProject>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProjectsPattern.UPDATE_PROJECT_BY_ID, {
          id,
          data: payload,
        })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }
}
