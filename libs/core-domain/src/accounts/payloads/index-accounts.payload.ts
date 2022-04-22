import { AccountRole } from '@prisma/client';

export interface IIndexAccountsFilter {
  role?: AccountRole;
  hasSupervisor?: boolean;
}
