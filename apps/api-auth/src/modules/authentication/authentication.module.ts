import { Module } from '@nestjs/common';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthCode, CoreRpcException } from '@sv-connect/core-common';
import config from 'config';
import { readFileSync } from 'fs';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AccountsModule } from '../accounts/accounts.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import 'dotenv/config';
import { ProfilesModule } from '../profiles/profiles.module';

@Module({
  imports: [
    AccountsModule,
    JwtModule.register({
      signOptions: {
        algorithm: config.get('jwt.alg'),
        expiresIn: config.get('jwt.ttl'),
        issuer: config.get('jwt.iss'),
      },
      secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
        switch (requestType) {
          case JwtSecretRequestType.SIGN:
            return readFileSync(
              `${process.cwd()}${config.get('jwt.privateKeyPath')}`
            );
          case JwtSecretRequestType.VERIFY:
            return readFileSync(
              `${process.cwd()}${config.get('jwt.publicKeyPath')}`
            );
          default:
            throw CoreRpcException.new(AuthCode.INVALID_CREDENTIALS);
        }
      },
    }),
    PassportModule,
    ProfilesModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule {}
