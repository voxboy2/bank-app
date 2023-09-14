import { Transaction } from 'src/apis/transactions/transaction.entity';
import { Virtual_Account } from 'src/apis/virtual-accounts/virtual-accounts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Wallet } from '../wallets/wallet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user_id)
  transactions: Transaction[];

  
  @OneToMany(() => Virtual_Account, (virtual_account) => virtual_account.user_id)
  virtual_account: Virtual_Account[];

  @Column({ default : false })
  email_verified: boolean


  @OneToMany(() => Wallet, (wallet) => wallet.user_id)
  wallet: Wallet[];
}
