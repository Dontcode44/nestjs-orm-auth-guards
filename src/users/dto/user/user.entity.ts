import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';
import { Account } from '../accont/account.entity';
import { Exclude } from 'class-transformer';

/* It's a class that represents a user, and it has an id, email, password, and account */
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @IsNumber()
  @Exclude()
  readonly id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail({ message: 'Invalid email' })
  @Exclude()
  readonly email: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @Exclude()
  readonly password: string;

  @OneToOne(() => Account)
  @JoinColumn()
  @Exclude()
  account: Account;

  @Column({ default: false })
  @IsNotEmpty()
  assigned: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
