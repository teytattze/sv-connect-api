import { Module } from '@nestjs/common';
import { MunkresModule } from '../munkres/munkres.module';
import { ProjectsModule } from '../projects/projects.module';
import { StudentsModule } from '../students/students.module';
import { SupervisorsModule } from '../supervisors/supervisors.module';
import { MatchesController } from './matches.controller';
import { MatchesHelper } from './matches.helper';
import { MatchesService } from './matches.service';

@Module({
  imports: [MunkresModule, ProjectsModule, StudentsModule, SupervisorsModule],
  controllers: [MatchesController],
  providers: [MatchesHelper, MatchesService],
})
export class MatchesModule {}
