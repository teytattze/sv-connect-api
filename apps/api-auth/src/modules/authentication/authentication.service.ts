import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  IAccount,
  IAuthenticationService,
  IAuthToken,
  IRegisterPayload,
  ILoginPayload,
} from '@sv-connect/core-domain';
import * as bcrypt from 'bcryptjs';
import _ from 'lodash';
import { AdminAccountsService } from '../accounts/accounts.admin.service';
import { AccountsService } from '../accounts/accounts.service';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly adminAcountsService: AdminAccountsService,
    private readonly profilesService: ProfilesService,
    private readonly jwtService: JwtService
  ) {}

  async register({
    firstName,
    lastName,
    email,
    password,
    role,
  }: IRegisterPayload): Promise<{
    account: IAccount;
    accessToken: string;
  }> {
    const { data: account } = await this.accountsService.createAccount({
      email,
      password,
      role,
    });
    await this.profilesService.createProfile({
      firstName,
      lastName,
      account: { id: account.id },
    });
    const { accessToken } = await this.login(account);
    return { account, accessToken };
  }

  async login(account: IAccount): Promise<IAuthToken> {
    const payload = {
      sub: account.id,
      account,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  validateJwt(jwtAccount: IAccount, cookieAccount: IAccount): boolean {
    return _.isEqual(jwtAccount, cookieAccount);
  }

  async validateAccount({ email, password }: ILoginPayload): Promise<IAccount> {
    const { data: account } = await this.adminAcountsService.getAccountByEmail(
      email
    );
    if (!account || !password || !email) return null;
    const isMatched = await this.compareHashedPassword(
      password,
      account.password
    );
    if (account && isMatched) {
      delete account.password;
      return account;
    }
    return null;
  }

  private async compareHashedPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
