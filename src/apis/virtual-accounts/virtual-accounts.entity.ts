import { User } from "../users/user.entity";
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Virtual_Account {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ default: 'USD'})
    currency: string;
 
    @ManyToOne(() => User, user => user.virtual_account)
    @JoinColumn({ name: 'user_id' })
    user_id: User;
}
