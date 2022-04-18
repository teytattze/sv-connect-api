import { ICoreServiceResponse } from '@sv-connect/core-common';
import { ICreateProfilePayload } from '../payloads/create-profile.payload';
import { IUpdateProfilePayload } from '../payloads/update-profile.payload';
import { IProfile } from './profile.interface';

export interface IProfilesClient {
  createProfile?(
    payload: ICreateProfilePayload
  ): Promise<ICoreServiceResponse<IProfile>>;
  getProfileById?(id: string): Promise<ICoreServiceResponse<IProfile>>;
  getProfileByAccountId?(
    accountId: string
  ): Promise<ICoreServiceResponse<IProfile>>;
  updateProfileByAccountId?(
    id: string,
    payload: IUpdateProfilePayload
  ): Promise<ICoreServiceResponse<IProfile>>;
  updateProfileByAccountId?(
    accountId: string,
    payload: IUpdateProfilePayload
  ): Promise<ICoreServiceResponse<IProfile>>;
}
