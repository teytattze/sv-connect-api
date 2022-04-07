import { Student } from '@prisma/client';
import { Nullable } from '@sv-connect/core-common';
import { IProject } from '../../projects';

export interface IStudent extends Student {}

export interface IStudentWithProject extends IStudent {
  project: Nullable<IProject>;
}
