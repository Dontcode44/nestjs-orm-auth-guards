import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAccountDto } from './dto/accont/create-account.dto';
import { CreateUserDto } from './dto/user/create-user.dto';
import { User } from './dto/user/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /* Creating a new user. */
  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<User> {
    return this.userService.createUser(newUser);
  }

  /* Creating a new account for a user. */
  @UseGuards(JwtAuthGuard)
  @Post(':id/account')
  createAccount(
    @Param('id', ParseIntPipe) id: number,
    @Body() account: CreateAccountDto,
  ): Promise<User> {
    return this.userService.createAccount(+id, account);
  }
}
