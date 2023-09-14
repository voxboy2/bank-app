import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from 'src/apis/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { WalletsService } from '../wallets/wallets.service';
import { Wallet } from '../wallets/wallet.entity';

@Module({
  imports: [ConfigModule,TypeOrmModule.forFeature([User, Wallet])],
  controllers: [EmailsController],
  providers: [EmailsService,WalletsService, UsersService, JwtService],
  exports: [EmailsService]
})
export class EmailsModule {}
