import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { Wallet } from './wallet.entity';
import { User } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsService } from '../emails/emails.service';


@Module({
  imports: [TypeOrmModule.forFeature([User,Wallet])],
  controllers: [WalletsController],
  providers: [WalletsService]
})
export class WalletsModule {}
