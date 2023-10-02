import { Inflow } from 'src/apis/inflows/inflow.entity';
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

  @OneToMany(() => Inflow, (inflow) => inflow.user_id)
  inflows: Inflow[];


  @Column({ default : false })
  email_verified: boolean


  @OneToMany(() => Wallet, (wallet) => wallet.user_id)
  wallet: Wallet[];
}
