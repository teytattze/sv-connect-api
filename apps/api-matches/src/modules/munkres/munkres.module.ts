import { Module } from '@nestjs/common';
import { MunkresAlgorithm } from './munkres.algorithm';

@Module({
  providers: [MunkresAlgorithm],
  exports: [MunkresAlgorithm],
})
export class MunkresModule {}
