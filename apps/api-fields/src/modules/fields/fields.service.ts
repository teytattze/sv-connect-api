import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { FieldsCode } from '@sv-connect/core-common';
import {
  IBulkDeleteFieldsByIdPayload,
  ICreateFieldPayload,
  IField,
  IFieldsService,
  IUpdateFieldPayload,
} from '@sv-connect/core-domain';
import to from 'await-to-js';
import { handlePrismaError } from './fields.helper';
import { FieldsRepository } from './fields.repository';

@Injectable()
export class FieldsService implements IFieldsService {
  constructor(private readonly fieldsRepository: FieldsRepository) {}

  async indexFields(): Promise<IField[]> {
    const [error, fields] = await to<IField[], any>(
      this.fieldsRepository.findFields()
    );
    if (error) handlePrismaError(error);
    return fields;
  }

  async getFieldById(id: string): Promise<IField> {
    const [error, fields] = await to<IField, any>(
      this.fieldsRepository.findField({ id })
    );
    if (error) handlePrismaError(error);
    if (!fields) throw new RpcException(FieldsCode.FIELD_NOT_FOUND);
    return fields;
  }

  async createField(payload: ICreateFieldPayload): Promise<IField> {
    const isExisted = await this.isFieldExistsByTitle(payload.title);
    if (isExisted) throw new RpcException(FieldsCode.FIELD_TITLE_EXISTS);

    const [error, field] = await to<IField, any>(
      this.fieldsRepository.createField(payload)
    );
    if (error) handlePrismaError(error);
    return field;
  }

  async updateFieldById(
    id: string,
    payload: IUpdateFieldPayload
  ): Promise<IField> {
    const [error, fields] = await to<IField, any>(
      this.fieldsRepository.updateField({ id }, payload)
    );
    if (error) handlePrismaError(error);
    return fields;
  }

  async bulkDeleteFieldsById(
    payload: IBulkDeleteFieldsByIdPayload
  ): Promise<void> {
    const { ids } = payload;
    const promises = ids.map((id) => this.deleteFieldById(id));
    await Promise.all(promises);
  }

  async deleteFieldById(id: string): Promise<void> {
    const [error] = await to<void, any>(
      this.fieldsRepository.deleteField({ id })
    );
    if (error) handlePrismaError(error);
  }

  async isFieldExistsByTitle(title: string): Promise<boolean> {
    const [error, account] = await to(
      this.fieldsRepository.findField({ title })
    );
    return error || !account ? false : true;
  }
}
