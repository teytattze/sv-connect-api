import { Module } from '@nestjs/common';
import { PrismaModule } from '@sv-connect/app-common';
import config from 'config';
import { FieldsModule } from './modules/fields/fields.module';
import 'dotenv/config';

@Module({
  imports: [
    FieldsModule,
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
