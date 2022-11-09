import { Exclude } from 'class-transformer';
import { IsString, IsNotEmpty, IsPositive, IsNumber } from 'class-validator';

/* It's a DTO that contains the data needed to create a publication */
export class CreatePublicationDto {
  @IsNotEmpty()
  @IsString()
  @Exclude()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Exclude()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  authorId: number;
}
