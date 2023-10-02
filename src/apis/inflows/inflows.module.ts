import { Module } from '@nestjs/common';
import { InflowsService } from './inflows.service';
import { InflowsController } from './inflows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Wallet } from '../wallets/wallet.entity';
import { Inflow } from './inflow.entity';
import { Wallet_Transaction } from '../wallets/wallet-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet, Inflow, Wallet_Transaction])],
  controllers: [InflowsController],
  providers: [InflowsService]
})
export class InflowsModule {}
