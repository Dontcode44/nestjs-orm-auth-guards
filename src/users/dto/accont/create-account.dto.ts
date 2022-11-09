import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

/* It's a class that has a name, lastname, age, and account property */
export class CreateAccountDto {
  @IsNotEmpty()
  @Exclude()
  name: string;

  @IsNotEmpty()
  @Exclude()
  lastname: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Exclude()
  age: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Exclude()
  account?: number;
}