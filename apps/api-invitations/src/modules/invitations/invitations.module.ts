import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsRepository } from './invitations.repository';
import { InvitationsController } from './invitations.controller';
import { StudentsModule } from '../students/students.module';
import { SupervisorsModule } from '../supervisors/supervisors.module';

@Module({
  imports: [StudentsModule, SupervisorsModule],
  controllers: [InvitationsController],
  providers: [InvitationsService, InvitationsRepository],
})
export class InvitationsModule {}
