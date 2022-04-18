import { ICreateSpecializationPayload } from '../payloads/create-specialization.payload';
import { IBulkDeleteSpecializationsByIdPayload } from '../payloads/delete-specialization.payload';
import { IUpdateSpecializationPayload } from '../payloads/update-specialization.payload';
import { ISpecialization } from './specialization.interface';

export interface ISpecializationsService {
  indexSpecializations(): Promise<ISpecialization[]>;
  getSpecializationById(id: string): Promise<ISpecialization>;
  createSpecialization(
    payload: ICreateSpecializationPayload
  ): Promise<ISpecialization>;
  updateSpecializationById(
    id: string,
    payload: IUpdateSpecializationPayload
  ): Promise<ISpecialization>;
  bulkDeleteSpecializationsById(
    payload: IBulkDeleteSpecializationsByIdPayload
  ): Promise<void>;
  deleteSpecializationById(id: string): Promise<void>;
}
