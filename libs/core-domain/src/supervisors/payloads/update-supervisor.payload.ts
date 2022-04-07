import {
  IUpdateManySpecializationsRelationPayload,
  IUpdateOneFieldRelationPayload,
} from '@sv-connect/core-common';

export interface IUpdateSupervisorPayload {
  capacity?: number;
  field?: IUpdateOneFieldRelationPayload;
  specializations?: IUpdateManySpecializationsRelationPayload;
}
