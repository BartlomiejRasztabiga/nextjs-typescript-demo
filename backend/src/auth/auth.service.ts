import { User } from '../users/schemas/user.schema';

const bcrypt = require('bcryptjs');

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid !== true) {
        return null;
      }

      const result = {
        email: user.email,
        _id: user._id
      };

      return result;
    }


    return null;
  }

  async login(user: User): Promise<any> {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
