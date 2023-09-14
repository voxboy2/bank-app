import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { useContainer } from 'class-validator';
import { User } from 'src/entities';
import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

import { Wallet } from './wallet.entity';
@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(Wallet) private wallet: Repository<Wallet>,
  ) {}

  async create(user: any) : Promise<Wallet> {

    let wallet =  await this.wallet.create({
      balance : 0,
      currency: "NGN",
      user_id: user
    });

    console.log(wallet);

    return await this.wallet.save(wallet);
  }

  findAll() {
    return `This action returns all wallets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
