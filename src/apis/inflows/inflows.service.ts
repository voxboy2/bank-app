import {
  Injectable,
  NotFoundException,
  ConflictException,
  HttpException,
} from '@nestjs/common';
import { Wallet_Transaction } from '../wallets/wallet-transaction.entity';
import { Wallet } from '../wallets/wallet.entity';
import { Inflow } from './inflow.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import {
  Transaction_Flow,
  Payment_Provider,
  Payment_Status,
} from 'src/common/enums';
import * as crypto from 'crypto';

@Injectable()
export class InflowsService {
  constructor(
    @InjectRepository(Wallet) private wallet: Repository<Wallet>,
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(Wallet_Transaction)
    private wallet_transaction: Repository<Wallet_Transaction>,
    @InjectRepository(Inflow) private inflow: Repository<Inflow>,
  ) {}

  async validateUserWallet(user_id: any) {
    try {
      const userWallet = await this.wallet.findOne({
        where: { user_id: { id: user_id } },
        relations: ['user_id'],
      });
      return userWallet;
    } catch (error) {
      console.log(error);
    }
  }

  // async verifyPaystackWebhook(req: any, res: any) {
  //   const hash = crypto
  //     .createHmac('sha512', secret)
  //     .update(JSON.stringify(req.body))
  //     .digest('hex');
  //   if (hash == req.headers['x-paystack-signature']) {
  //     // Retrieve the request's body
  //     const event = req.body;
  //     // Do something with event
  //   }
  //   res.send(200);
  // }



  async processPaystackWebhook(req: any, res: any) {
    const webhook = req.body;

    const inflowExist = await this.inflow.findOne({
      where: { reference: webhook?.data?.reference },
    });

    console.log(inflowExist, 'hello');

    if (inflowExist) {
      throw new ConflictException('Inflow Already Exist');
    }

    const user = await this.repo.findOne({
      where: { email: webhook.data.customer?.email },
    });

    const wallet = await this.validateUserWallet(user?.id);

    await this.createWalletTransaction(
      user?.id,
      Payment_Status.SUCCESSFUL,
      webhook?.data.currency,
      webhook?.data.channel,
      webhook?.data.amount,
      Transaction_Flow.CREDIT,
    );

    let firstName = webhook?.data.customer.first_name;
    let lastName = webhook?.data.customer.last_name;

    let name = `${firstName} ${lastName}`;

    if (name) {
      await this.createInflow(
        user,
        webhook?.data.reference,
        webhook?.data.status,
        webhook?.data.currency,
        webhook?.data.channel,
        webhook?.data.amount,
        name,
        webhook?.data.customer?.email,
        webhook?.data.customer?.phone,
        Payment_Provider.PAYSTACK,
      );
    }

    await this.updateWallet(user?.id, webhook?.data.amount);

    console.log('Transaction Status:');

    return res.status(200).json({
      response: 'wallet funded successfully',
      data: wallet,
    });
  }
  catch(error) {
    console.log('Error verifying transaction:', error);
    throw error;
  }


  async createWalletTransaction(
    user_id: number,
    payment_status: any,
    currency: string,
    payment_method: string,
    amount: number,
    transaction_flow: any,
  ) {
    try {
      const walletTransaction = this.wallet_transaction.create({
        user_id,
        payment_status: payment_status,
        currency,
        payment_method,
        amount,
        transaction_flow: transaction_flow,
      });
      return this.wallet_transaction.save(walletTransaction);
    } catch (error) {
      console.log(error);
    }
  }

  async createInflow(
    user_id: User,
    id: any,
    payment_status: any,
    payment_method: string,
    currency: string,
    amount: number,
    name: string,
    email: string,
    phone: number,
    payment_provider: Payment_Provider.PAYSTACK,
  ) {
    try {
      const Inflow = this.inflow.create({
        user_id,
        reference: id,
        payment_status: payment_status,
        currency,
        payment_method: payment_method,
        amount,
        name,
        email,
        phone,
        payment_provider: payment_provider,
      });
      return this.inflow.save(Inflow);
    } catch (error) {}
  }

  async updateWallet(user_id: number, amount: number) {
    try {
      const wallet = await this.wallet.findOne({
        where: { user_id: user_id as FindOptionsWhere<User> },
      });

      if (!wallet) {
        throw new NotFoundException(`Wallet not found for userId: ${user_id}`);
      }

      wallet.balance += amount;

      await this.wallet.save(wallet);

      return wallet;
    } catch (error) {
      throw error;
    }
  }
}
