import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  line1: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ default: false })
  is_default: boolean;

  @ManyToOne('User', 'addresses', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: any;
}
