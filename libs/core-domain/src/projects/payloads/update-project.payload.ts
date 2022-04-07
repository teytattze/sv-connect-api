import {
  IUpdateManySpecializationsRelationPayload,
  IUpdateOneFieldRelationPayload,
} from '@sv-connect/core-common';

export interface IUpdateProjectPayload {
  title?: string;
  summary?: string;
  field?: IUpdateOneFieldRelationPayload;
  specializations?: IUpdateManySpecializationsRelationPayload;
}
