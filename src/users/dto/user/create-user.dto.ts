import { Exclude } from "class-transformer";
import { IsNotEmpty, IsEmail, IsString, IsFQDN } from 'class-validator';

/* CreateUserDto is a class that has two properties, email and password, and both are required and must
be a string. */
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Exclude()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Exclude()
  password: string;
}