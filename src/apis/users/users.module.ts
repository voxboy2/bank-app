import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
import { WalletsService } from 'src/apis/wallets/wallets.service';
import { Wallet } from 'src/apis/wallets/wallet.entity';
import { EmailsService } from 'src/apis/emails/emails.service';
import { JwtService } from '@nestjs/jwt';
import { Inflow } from '../inflows/inflow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet, Inflow])],
  controllers: [UsersController],
  providers: [
    EmailsService,
    UsersService,
    AuthService,
    WalletsService,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
