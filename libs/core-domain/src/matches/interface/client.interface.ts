import { ICoreServiceResponse } from '@sv-connect/core-common';
import { IStudent } from '../../students';
import { IAcceptMatchesPayload } from '../payload/accept-matches.payload';
import {
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '../payload/create-match.payload';
import { IMatch } from './match.interface';

export interface IMatchesClient {
  acceptMatches?(
    payload: IAcceptMatchesPayload
  ): Promise<ICoreServiceResponse<IStudent[]>>;
  matchSingleStudent?(
    payload: IMatchSingleStudentPayload
  ): Promise<ICoreServiceResponse<IMatch>>;
  matchSelectedStudents?(
    payload: IMatchSelectedStudentsPayload
  ): Promise<ICoreServiceResponse<IMatch[]>>;
  matchSelectedStudentsAndSupervisors?(
    payload: IMatchSelectedStudentsAndSupervisorsPayload
  ): Promise<ICoreServiceResponse<IMatch[]>>;
}
