import { Module } from '@nestjs/common';
import {
  ACCOUNTS_CLIENT,
  ClientsProvider,
  IClientsProviderOptions,
  PROFILES_CLIENT,
} from '@sv-connect/app-common';
import config from 'config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import 'dotenv/config';

const clientsProviderOptions: IClientsProviderOptions[] = [
  {
    provide: ACCOUNTS_CLIENT,
    transport: config.get('microservices.accounts'),
  },
  {
    provide: PROFILES_CLIENT,
    transport: config.get('microservices.profiles'),
  },
];

@Module({
  imports: [
    AuthenticationModule,
    ClientsProvider.register(clientsProviderOptions),
  ],
})
export class AppModule {}
