import { createParamDecorator } from '@nestjs/common';
import { IAccount } from '@sv-connect/core-domain';
import httpContext from 'express-http-context';

export const Account = createParamDecorator(
  (data: keyof Omit<IAccount, 'password'>) => {
    const account = httpContext.get('account');
    return data ? account[data] : account;
  }
);
