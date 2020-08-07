import bcrypt from 'bcryptjs';

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users//users.service';
import { User } from '../users/schemas/user.schema'


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            bcrypt.compare(password, user.password).then(response => {
                if (response !== true) {
                    return null;
                }
                const { password, ...result } = user;
                return result
            });
        }


        return null;
    }
}
