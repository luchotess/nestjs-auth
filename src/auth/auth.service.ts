import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService }                          from '../users/users.service';
import { JwtService }                            from '@nestjs/jwt';
import * as bcrypt                               from 'bcrypt';

export interface CredenditalsDTO {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor (
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser ({username = '', password = ''}: CredenditalsDTO): Promise<any> {
        const user = await this.usersService.findOne({username});

        if (!user) {
            throw new HttpException({error: 'Username not found.'}, HttpStatus.FORBIDDEN);
        }

        if (!await user.validatePassword(password)) {
            throw new HttpException({error: 'Incorrect password.'}, HttpStatus.FORBIDDEN);
        }

        return user.serialize();
    }

    async login (user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
