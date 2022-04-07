import { IUpdateManyFieldsRelationsPayload } from '@sv-connect/core-common';

export interface IUpdateSpecializationPayload {
  title?: string;
  fields?: IUpdateManyFieldsRelationsPayload;
}
