import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/dto/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * It takes an email and password, gets the user from the database, and if the password matches,
   * returns the user
   * @param {string} email - string - The email of the user
   * @param {string} password - The password that the user entered in the login form.
   * @returns The user object
   */
  async validateUserCreds(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) throw new BadRequestException();

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException();

    return user;
  }

  /**
   * It takes a user object, and returns an object with a single property, access_token, which is a JWT
   * token
   * @param {User} user - User - The user object that was returned from the database.
   * @returns An object with a property called access_token.
   */
  async generateToken(user: User): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
    };
  }
}
