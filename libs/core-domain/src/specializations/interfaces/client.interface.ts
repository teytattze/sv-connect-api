import { ICoreServiceResponse } from '@sv-connect/core-common';
import { ICreateSpecializationPayload } from '../payloads/create-specialization.payload';
import { IBulkDeleteSpecializationsByIdPayload } from '../payloads/delete-specialization.payload';
import { IUpdateSpecializationPayload } from '../payloads/update-specialization.payload';
import { ISpecialization } from './specialization.interface';

export interface ISpecializationsClient {
  indexSpecializations?(): Promise<ICoreServiceResponse<ISpecialization[]>>;
  getSpecializationById?(
    id: string
  ): Promise<ICoreServiceResponse<ISpecialization>>;
  createSpecialization?(
    payload: ICreateSpecializationPayload
  ): Promise<ICoreServiceResponse<ISpecialization>>;
  updateSpecializationById?(
    id: string,
    payload: IUpdateSpecializationPayload
  ): Promise<ICoreServiceResponse<ISpecialization>>;
  bulkDeleteSpecializationsById?(
    payload: IBulkDeleteSpecializationsByIdPayload
  ): Promise<ICoreServiceResponse<null>>;
  deleteSpecializationById?(id: string): Promise<ICoreServiceResponse<null>>;
}
