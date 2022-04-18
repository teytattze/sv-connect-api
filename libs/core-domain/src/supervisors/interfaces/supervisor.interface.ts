import { Field, Specialization, Supervisor } from '@prisma/client';
import { Nullable } from '@sv-connect/core-common';

export interface ISupervisor extends Omit<Supervisor, 'fieldId'> {
  field: Nullable<Field>;
  specializations: Specialization[];
}
