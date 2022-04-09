import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProfilesPattern, PROFILES_CLIENT } from '@sv-connect/app-common';
import {
  CoreHttpException,
  ICoreServiceResponse,
} from '@sv-connect/core-common';
import {
  ICreateProfilePayload,
  IProfile,
  IProfilesClient,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProfilesService implements IProfilesClient {
  constructor(@Inject(PROFILES_CLIENT) private readonly client: ClientProxy) {}

  async createProfile(
    payload: ICreateProfilePayload
  ): Promise<ICoreServiceResponse<IProfile>> {
    const [error, response] = await to<
      ICoreServiceResponse<IProfile>,
      ICoreServiceResponse<null>
    >(
      firstValueFrom(
        this.client.send(ProfilesPattern.CREATE_PROFILE, { data: payload })
      )
    );
    if (error) throw CoreHttpException.fromService(error);
    return response;
  }
}
