import { Nullable } from '@sv-connect/core-common';

export interface IUpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  headline?: Nullable<string>;
  summary?: Nullable<string>;
  pictureUrl?: Nullable<string>;
  backgroundUrl?: Nullable<string>;
}
