import { IUpdateManySpecializationsRelationPayload } from '@sv-connect/core-common';

export interface IUpdateFieldPayload {
  title?: string;
  specializations?: IUpdateManySpecializationsRelationPayload;
}
