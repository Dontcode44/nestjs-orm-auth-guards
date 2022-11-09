import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/* This class extends the AuthGuard class and uses the 'local' strategy. */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}