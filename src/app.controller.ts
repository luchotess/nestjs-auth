import {
    Controller, Request, Post,
    UseGuards, Get, Delete, Res, HttpStatus
}                       from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { Response }     from 'express';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class AppController {
    constructor (private usersService: UsersService) {}

    @Get()
    async getUsers (@Request() req) {
        return await this.usersService.findAll();
    }

    @Post()
    async createUser (@Request() req, @Res() res: Response) {
        if (!req.body.role) {
            req.body.role = 'admin';
        }

        return res.status(201).json(await this.usersService.create(req.body));
    }

    @Delete(':id')
    async deleteUser (@Request() req) {
        return await this.usersService.delete(req.params.id);
    }
}
