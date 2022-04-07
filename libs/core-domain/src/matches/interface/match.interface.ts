import { IStudentWithProject } from '../../students';
import { ISupervisor } from '../../supervisors';
import { Nullable } from '@sv-connect/core-common';

export interface IMatch {
  student: Nullable<IStudentWithProject>;
  supervisor: Nullable<ISupervisor>;
  isMatched: boolean;
  isApproved: boolean;
}
