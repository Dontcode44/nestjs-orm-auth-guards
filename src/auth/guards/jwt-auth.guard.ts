import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/* JwtAuthGuard extends AuthGuard('jwt') */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
