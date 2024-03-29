import {
  PrismaErrorCode,
  AccountsCode,
  GeneralCode,
  CoreRpcException,
} from '@sv-connect/core-common';
import { Prisma } from '@prisma/client';

export const handlePrismaError = <TError = any>(error: TError) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case PrismaErrorCode.NOT_FOUND:
        throw CoreRpcException.new(AccountsCode.ACCOUNT_NOT_FOUND);
      case PrismaErrorCode.UNIQUE_CONSTRAINT:
        throw CoreRpcException.new(AccountsCode.ACCOUNT_EMAIL_EXISTS);
      default:
        break;
    }
  }
  throw CoreRpcException.new(GeneralCode.INTERNAL_SERVER_ERROR);
};
