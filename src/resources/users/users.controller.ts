import {
    Controller, Request, Post,
    UseGuards, Res, Get
}                         from '@nestjs/common';
import { JwtAuthGuard }   from 'src/core/auth/guards/jwt-auth.guard';
import { UsersService }   from 'src/resources/users/users.service';
import { Response }       from 'express';
import { BaseController } from '../../core/base.controller';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController extends BaseController {
    constructor (private _UsersService: UsersService) {
        super(_UsersService)
    }

    @Post()
    async createUser (@Request() req, @Res() res: Response) {
        if (!req.body.role) {
            req.body.role = 'admin';
        }

        return res.status(201).json(await this._UsersService.create(req.body));
    }

    @Get('clients')
    async getUserProjects(@Request() req, @Res() res: Response) {
        return res.json(await this._UsersService.getUserClients(req.user.id));
    }
}
