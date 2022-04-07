import { ICoreServiceResponse } from '@sv-connect/core-common';
import { ICreateProfilePayload } from '../payloads/create-profile.payload';
import { IUpdateProfilePayload } from '../payloads/update-profile.payload';
import { IProfile } from './profile.interface';

export interface IProfilesClient {
  createProfile?(
    payload: ICreateProfilePayload
  ): Promise<ICoreServiceResponse<IProfile>>;
  updateProfileByAccountId?(
    accountId: string,
    payload: IUpdateProfilePayload
  ): Promise<ICoreServiceResponse<IProfile>>;
}
