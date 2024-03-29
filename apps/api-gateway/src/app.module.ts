import { Module } from '@nestjs/common';
import {
  ACCOUNTS_CLIENT,
  ClientsProvider,
  FIELDS_CLIENT,
  IClientsProviderOptions,
  INVITATIONS_CLIENT,
  MATCHES_CLIENT,
  PROFILES_CLIENT,
  PROJECTS_CLIENT,
  SPECIALIZATIONS_CLIENT,
  STUDENTS_CLIENT,
  SUPERVISORS_CLIENT,
} from '@sv-connect/app-common';
import config from 'config';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { FieldsModule } from './modules/fields/fields.module';
import { InvitationsModule } from './modules/invitations/invitations.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { SpecializationsModule } from './modules/specializations/specializations.module';
import { StudentsModule } from './modules/students/students.module';
import { SupervisorsModule } from './modules/supervisors/supervisors.module';
import { MatchesModule } from './modules/matches/matches.module';
import 'dotenv/config';

const clientsProviderOptions: IClientsProviderOptions[] = [
  {
    provide: ACCOUNTS_CLIENT,
    transport: config.get('microservices.accounts'),
  },
  {
    provide: FIELDS_CLIENT,
    transport: config.get('microservices.fields'),
  },
  {
    provide: INVITATIONS_CLIENT,
    transport: config.get('microservices.invitations'),
  },
  {
    provide: MATCHES_CLIENT,
    transport: config.get('microservices.match'),
  },
  {
    provide: PROFILES_CLIENT,
    transport: config.get('microservices.profiles'),
  },
  {
    provide: PROJECTS_CLIENT,
    transport: config.get('microservices.projects'),
  },
  {
    provide: SPECIALIZATIONS_CLIENT,
    transport: config.get('microservices.specializations'),
  },
  {
    provide: STUDENTS_CLIENT,
    transport: config.get('microservices.students'),
  },
  {
    provide: SUPERVISORS_CLIENT,
    transport: config.get('microservices.supervisors'),
  },
];

@Module({
  imports: [
    AccountsModule,
    AuthenticationModule,
    ClientsProvider.register(clientsProviderOptions),
    FieldsModule,
    InvitationsModule,
    MatchesModule,
    ProfilesModule,
    ProjectsModule,
    SpecializationsModule,
    StudentsModule,
    SupervisorsModule,
  ],
})
export class AppModule {}
