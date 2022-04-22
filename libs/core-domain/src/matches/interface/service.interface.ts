import { IStudent } from '../../students';
import { IAcceptMatchesPayload } from '../payload/accept-matches.payload';
import {
  IMatchSelectedStudentsAndSupervisorsPayload,
  IMatchSelectedStudentsPayload,
  IMatchSingleStudentPayload,
} from '../payload/create-match.payload';
import { IMatch } from './match.interface';

export interface IMatchesService {
  acceptMatches(payload: IAcceptMatchesPayload): Promise<IStudent[]>;
  matchSingleStudent(payload: IMatchSingleStudentPayload): Promise<IMatch>;
  matchSelectedStudents(
    payload: IMatchSelectedStudentsPayload
  ): Promise<IMatch[]>;
  matchSelectedStudentsAndSupervisors(
    payload: IMatchSelectedStudentsAndSupervisorsPayload
  ): Promise<IMatch[]>;
}
