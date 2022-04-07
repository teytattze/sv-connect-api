import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  HttpExceptionFilter,
  HttpResponseInterceptor,
} from '@sv-connect/app-common';
import bodyParser from 'body-parser';
import config from 'config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import httpContext from 'express-http-context';
import { AppModule } from './app.module';
import 'dotenv/config';

const GLOBAL_PREFIX = 'api';
const SERVICE_NAME = config.get<string>('service.name').toUpperCase();
const PORT = config.get<number>('server.port');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'],
  });
  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.use(bodyParser.json());
  app.use(httpContext.middleware);
  app.use(cookieParser());
  app.use(helmet());

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  await app.listen(PORT);
}
bootstrap()
  .then(() => {
    Logger.log(`API ${SERVICE_NAME} is listening on port ${PORT}`);
  })
  .catch((err) => {
    Logger.error(err);
  });
