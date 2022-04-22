import { ICreateStudentPayload } from '../payloads/create-student.payload';
import { IIndexStudentFilter } from '../payloads/index-student.payload';
import { IUpdateStudentPayload } from '../payloads/update-student.payload';
import { IStudent } from './student.interface';

export interface IStudentsService {
  indexStudents(filter?: IIndexStudentFilter): Promise<IStudent[]>;
  getStudentById(id: string): Promise<IStudent>;
  getStudentByAccountId(accountId: string): Promise<IStudent>;
  createStudent(payload: ICreateStudentPayload): Promise<IStudent>;
  updateStudentById(
    id: string,
    payload: IUpdateStudentPayload
  ): Promise<IStudent>;
  updateStudentByAccountId(
    accountId: string,
    payload: IUpdateStudentPayload
  ): Promise<IStudent>;
  deleteStudentById(id: string): Promise<void>;
}
