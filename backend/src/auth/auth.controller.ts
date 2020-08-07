import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { Request} from 'express';
import { LocalAuthGuard } from './local-auth.guard';

type User = any;

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) : Promise<User> {
    return req.user;
  }
}
