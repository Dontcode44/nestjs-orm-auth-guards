import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsAlpha, IsNotEmpty } from 'class-validator';
import { Publication } from 'src/publications/entities/publication.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @Exclude()
  readonly id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsAlpha()
  @Exclude()
  readonly name: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsAlpha()
  @Exclude()
  readonly lastname: string;

  @Column({ type: 'timestamp', nullable: false })
  @IsNotEmpty()
  @Exclude()
  age?: Date;

  @OneToMany(() => Publication, (publication) => publication.author)
  @Index("idx_publications")
  @Exclude()
  readonly publication: Publication[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}