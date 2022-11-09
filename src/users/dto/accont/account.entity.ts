import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Publication } from "src/publications/entities/publication.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @Exclude()
  readonly id: number;

  @IsNotEmpty()
  @Column({ nullable: false })
  @Index("idx_names", { unique: true })
  @Exclude()
  readonly name: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  @Exclude()
  readonly lastname: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  @Index("idx_ages", { unique: false })
  @IsNumber()
  @IsPositive()
  @Exclude()
  readonly age: number;

  @OneToMany(() => Publication, publication => publication.author)
  @Exclude()
  readonly publication: Publication[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}