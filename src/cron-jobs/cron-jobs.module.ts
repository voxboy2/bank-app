import { Module } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import { CronJobsController } from './cron-jobs.controller';
import { EmailsService } from 'src/apis/emails/emails.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/apis/users/users.service';
import { User } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletsService } from 'src/apis/wallets/wallets.service';
import { Wallet } from 'src/apis/wallets/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet])],
  controllers: [CronJobsController],
  providers: [CronJobsService,UsersService, JwtService, WalletsService, EmailsService],
})
export class CronJobsModule {}
