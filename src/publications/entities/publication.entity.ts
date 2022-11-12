import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';
import { Account } from 'src/users/dto/accont/account.entity';
import { Exclude } from 'class-transformer';

/* It's a class that represents a publication, and it has a relationship with the Account class */
@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Exclude()
  readonly id: number;

  @Column()
  @Index("idx_tittles")
  @IsNotEmpty()
  @IsString()
  @Exclude()
  readonly title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Exclude()
  readonly content: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Exclude()
  readonly authorId: number;

  @ManyToOne(() => Account, (account) => account.publication)
  @Exclude()
  readonly author: Account;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
