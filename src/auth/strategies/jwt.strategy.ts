import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';


/* A class that extends the PassportStrategy class. It is a class that is used to validate the JWT. */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  /**
   * It takes a payload, and returns an object with an id and email property
   * @param {any} payload - The JWT payload.
   * @returns The user's id and email.
   */
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
