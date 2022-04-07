import {
  INestApplication,
  INestMicroservice,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_OPTIONS } from './prisma.const';
import { IPrismaModuleOptions } from './prisma.interface';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(@Inject(PRISMA_OPTIONS) options: IPrismaModuleOptions) {
    super({
      datasources: {
        db: {
          url: `${options.type}://${options.username}:${options.password}@${options.host}:${options.port}/${options.database}?${options.property}`,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication | INestMicroservice) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
