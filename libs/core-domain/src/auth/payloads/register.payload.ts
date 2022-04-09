import { AccountRole } from '@prisma/client';

export interface IRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: AccountRole;
}
