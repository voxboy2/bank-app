import { Module } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import { CronJobsController } from './cron-jobs.controller';
import { EmailsService } from 'src/apis/emails/emails.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/apis/users/users.service';
import { User } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CronJobsController],
  providers: [CronJobsService,UsersService, JwtService, EmailsService],
})
export class CronJobsModule {}
