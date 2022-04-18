import { ICoreServiceResponse } from '@sv-connect/core-common';
import { IField } from './field.interface';
import { ICreateFieldPayload } from '../payloads/create-field.payload';
import { IUpdateFieldPayload } from '../payloads/update-field.payload';
import { IBulkDeleteFieldsByIdPayload } from '../payloads/delete-field.payload';

export interface IFieldsClient {
  indexFields?(): Promise<ICoreServiceResponse<IField[]>>;
  getFieldById?(id: string): Promise<ICoreServiceResponse<IField>>;
  createField?(
    payload: ICreateFieldPayload
  ): Promise<ICoreServiceResponse<IField>>;
  updateFieldById?(
    id: string,
    payload: IUpdateFieldPayload
  ): Promise<ICoreServiceResponse<IField>>;
  bulkDeleteFieldsById?(
    payload: IBulkDeleteFieldsByIdPayload
  ): Promise<ICoreServiceResponse<void>>;
  deleteFieldById?(id: string): Promise<ICoreServiceResponse<void>>;
}
