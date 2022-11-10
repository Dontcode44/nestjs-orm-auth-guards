import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './dto/user/user.entity';
import * as bcrypt from 'bcrypt';
import { Account } from './dto/accont/account.entity';
import { CreateAccountDto } from './dto/accont/create-account.dto';
import { CreateUserDto } from './dto/user/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  /**
   * We're using the findOne method from the TypeORM repository to find a user by their id.
   * If the user is not found, we throw a HttpException with a message and a status code. If the user is found, we
   * return the user
   * @param {number} id - number - this is the id of the user we want to find
   * @returns The user object
   */
  async getOneUser(id: number) {
    const foundUser = await this.userRepo.findOne({
      where: {
        id,
      },
    });
    if (!foundUser) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return foundUser;
  }

  /**
   * It creates a new user by checking if the user already exists, if not, it creates a new user and
   * saves it to the database
   * @param {CreateUserDto} user - CreateUserDto
   * @returns The user object
   */
  async createUser(user: CreateUserDto) {
    const foundUser = await this.userRepo.findOne({
      where: {
        email: user.email,
        
      },
    });
    if (foundUser) {
      new HttpException('User alredy exists', HttpStatus.CONFLICT);
    }

    const hashPwd = await bcrypt.hash(user.password, 10);
    user.password = hashPwd;
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

  /**
   * We're creating a new account, saving it, and then assigning it to the user
   * @param {number} id - number - The id of the user we want to create an account for.
   * @param {CreateAccountDto} user - CreateAccountDto
   * @returns The user with the new account
   */
  async createAccount(id: number, user: CreateAccountDto) {
    const userFound = await this.userRepo.findOne({
      where: {
        id,
      },
      relations: ['account'],
    });
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newAccount = this.accountRepository.create(user);
    const savedProfile = await this.accountRepository.save(newAccount);
    userFound.account = savedProfile;

    return this.userRepo.save(userFound);
  }

  async getUserByEmail(email: string): Promise<User> {
    const foundEmail= await this.userRepo.findOne({
      where: {
        email,
      },
    });
    if (!foundEmail) {
      throw new HttpException('Email not registred', HttpStatus.NOT_FOUND);
    }
    return foundEmail;
  }
}
