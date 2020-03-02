import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response }                                       from 'express';
import { JwtAuthGuard }                              from '../../core/auth/guards/jwt-auth.guard';
import { BaseController }                            from '../../core/base.controller';
import { ProjectsService }                           from '../projects/projects.service';
import { ClientsService }                            from './clients.service';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController extends BaseController {
    constructor (private _ClientsService: ClientsService,
                 private _ProjectsService: ProjectsService) {
        super(_ClientsService);
    }

    @Post(':id/projects')
    async createClientProject(@Request() req, @Res() res: Response) {
        res.status(501).json(await this._ProjectsService.create({
            ...req.body,
            owners: [req.user.id],
            clientId: req.params.id
        }));
    }

    @Get(':id/projects')
    async getClientProject(@Request() req, @Res() res: Response) {
        res.status(501).json(await this._ProjectsService.findCondition({
            clientId: req.params.id
        }));
    }
}
