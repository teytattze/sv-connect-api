import { ICoreServiceResponse } from '@sv-connect/core-common';
import { ICreateStudentPayload } from '../payloads/create-student.payload';
import { IIndexStudentFilterPayload } from '../payloads/index-student.payload';
import { IUpdateStudentPayload } from '../payloads/update-student.payload';
import { IStudent } from './student.interface';

export interface IStudentsClient {
  indexStudents?(
    filter?: IIndexStudentFilterPayload
  ): Promise<ICoreServiceResponse<IStudent[]>>;
  getStudentById?(id: string): Promise<ICoreServiceResponse<IStudent>>;
  getStudentByAccountId?(
    accountId: string
  ): Promise<ICoreServiceResponse<IStudent>>;
  createStudent?(
    payload: ICreateStudentPayload
  ): Promise<ICoreServiceResponse<IStudent>>;
  udpateStudentById?(
    id: string,
    payload: IUpdateStudentPayload
  ): Promise<ICoreServiceResponse<IStudent>>;
  updateStudentByAccountId?(
    accountId: string,
    payload: IUpdateStudentPayload
  ): Promise<ICoreServiceResponse<IStudent>>;
  deleteStudentById?(id: string): Promise<ICoreServiceResponse<null>>;
}
