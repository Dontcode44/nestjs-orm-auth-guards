import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/users/dto/user/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  /* Using the LocalAuthGuard to check if the user is valid. */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    //console.log('req.user', req.user);
    return this.authService.generateToken(req.user);
  }

 /* Using the JwtAuthGuard to check if the user is valid. */
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Request() req): Promise<User> {
    return req.user;
  }
}
