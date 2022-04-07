import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  RpcExceptionFilter,
  ServiceResponseInterceptor,
} from '@sv-connect/app-common';
import config from 'config';
import { AppModule } from './app.module';
import 'dotenv/config';

const SERVICE_NAME = config.get<string>('service.name').toUpperCase();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    config.get('service.transporter')
  );

  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalInterceptors(new ServiceResponseInterceptor());

  await app.listen();
}
bootstrap()
  .then(() => {
    Logger.log(`API ${SERVICE_NAME} is serving...`);
  })
  .catch((err) => {
    Logger.error(err);
  });
