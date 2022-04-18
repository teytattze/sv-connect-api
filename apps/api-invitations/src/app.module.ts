import { Module } from '@nestjs/common';
import {
  ACCOUNTS_CLIENT,
  ClientsProvider,
  IClientsProviderOptions,
  PrismaModule,
  STUDENTS_CLIENT,
} from '@sv-connect/app-common';
import config from 'config';
import { InvitationsModule } from './modules/invitations/invitations.module';
import 'dotenv/config';

const clientsProviderOptions: IClientsProviderOptions[] = [
  {
    provide: ACCOUNTS_CLIENT,
    transport: config.get('microservices.accounts'),
  },
  {
    provide: STUDENTS_CLIENT,
    transport: config.get('microservices.students'),
  },
];

@Module({
  imports: [
    ClientsProvider.register(clientsProviderOptions),
    InvitationsModule,
    PrismaModule.register({
      type: config.get('db.type'),
      username: config.get('db.username'),
      password: config.get('db.password'),
      host: config.get('db.host'),
      port: config.get('db.port'),
      database: config.get('db.database'),
      property: config.get('db.property'),
    }),
  ],
})
export class AppModule {}
