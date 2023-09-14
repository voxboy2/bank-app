import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Wallet } from './wallet.entity';

@Entity()
export class Wallet_Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ default: 0 })
  amount: number;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  payment_method: string;

  @Column({ nullable: true })
  transaction_flow: string;

  @Column({ nullable: true })
  payment_status: string;

//   @ManyToOne(() => Wallet, (wallet) => wallet.id)
//   @JoinColumn({ name: 'wallet_id' })
//   wallet_id: Wallet;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    })
  updated_at: Date;
}
