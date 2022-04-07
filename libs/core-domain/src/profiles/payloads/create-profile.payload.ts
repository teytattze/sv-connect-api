import { IConnectAccountPayload, Nullable } from '@sv-connect/core-common';

export interface ICreateProfilePayload {
  firstName: string;
  lastName: string;
  headline?: Nullable<string>;
  summary?: Nullable<string>;
  pictureUrl?: Nullable<string>;
  backgroundUrl?: Nullable<string>;
  account: IConnectAccountPayload;
}
