const bcrypt = require('bcryptjs');

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid !== true) {
        return null;
      }

      const result = {
        email: user.email
      }

      return result;
    }


    return null;
  }
}
