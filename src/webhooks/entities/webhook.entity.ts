import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Webhook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb', { nullable: true })
  data?: object[];

  @Column({ nullable: true })
  event: string;

  @Column({ nullable: true })
  reference: string;

  @Column({ nullable: true })
  event_type: string;

  @Column()
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
