import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Wallet } from '../wallets/wallet.entity';
import { Transaction } from './transaction.entity';
import { Wallet_Transaction } from '../wallets/wallet-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet, Transaction, Wallet_Transaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
