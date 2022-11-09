import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

/* The LocalStrategy class is a PassportStrategy that uses the Passport Strategy class */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * It takes in an email and password, validates the user credentials, and returns the user if the
   * credentials are valid
   * @param {string} email - string - The email address of the user
   * @param {string} password - The password that the user entered.
   * @returns The user object
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUserCreds(email, password);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
