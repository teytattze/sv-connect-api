import {
  PrismaErrorCode,
  GeneralCode,
  InvitationsCode,
  CoreRpcException,
} from '@sv-connect/core-common';
import { Prisma } from '@prisma/client';

export const handlePrismaError = <TError = any>(error: TError) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case PrismaErrorCode.NOT_FOUND:
        throw CoreRpcException.new(InvitationsCode.INVITATION_NOT_FOUND);
      default:
        break;
    }
  }
  throw CoreRpcException.new(GeneralCode.INTERNAL_SERVER_ERROR);
};