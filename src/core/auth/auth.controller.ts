import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService }                               from './auth.service';
import { LocalAuthGuard }                            from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Get('current')
    getProfile (@Request() req) {
        return req.user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login (@Request() req) {
        return this.authService.login(req.user);
    }
}
