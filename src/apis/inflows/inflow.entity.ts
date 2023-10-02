import { User } from '../users/user.entity';
import { Wallet_Transaction } from '../wallets/wallet-transaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Inflow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.inflows)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @Column({ unique: true })
  reference: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ nullable: true })
  phone: number;

  @Column({ default: 'NGN' })
  currency: string;

  @Column()
  payment_status: string;

  @Column({ default: null })
  payment_method: string;

  @Column({ default: null })
  payment_provider: string;


  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
