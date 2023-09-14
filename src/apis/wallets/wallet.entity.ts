
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/apis/users/user.entity";


@Entity()
export class Wallet {
   @PrimaryGeneratedColumn()
   id: number;
   
   @Column({ default: 0 })
   balance: number;

   @Column({ default: 'NGN'})
   currency: string;

   // @Column()
   // user_id: number;

   @ManyToOne(() => User, user => user.wallet)
   @JoinColumn({ name: 'user_id' })
   user_id : User;
}