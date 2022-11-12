import { Exclude } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

/* It's a class that has a name, lastname, age, and account property */
export class CreateAccountDto {
  @IsNotEmpty()
  @Exclude()
  readonly name: string;

  @IsNotEmpty()
  @Exclude()
  readonly lastname: string;

  @IsNotEmpty()
  @IsDateString()
  @Exclude()
  readonly age: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Exclude()
  account?: number;
}