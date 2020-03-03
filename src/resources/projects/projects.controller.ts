import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response }                                       from 'express';

import { JwtAuthGuard }   from '../../core/auth/guards/jwt-auth.guard';
import { BaseController } from '../../core/base.controller';
import { TasksService }   from '../tasks/tasks.service';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController extends BaseController {
    constructor (private _TasksService: TasksService) {
        super(_TasksService);
    }

    @Post(':id/tasks')
    async createProjectTask (@Request() req, @Res() res: Response) {
        res.status(501).json(await this._TasksService.create({
            ...req.body,
            status: 'open',
            creator  : req.user.id,
            projectId: req.params.id
        }));
    }

    @Get(':id/tasks')
    async getProjectTask (@Request() req, @Res() res: Response) {
        res.status(501).json(await this._TasksService.findCondition({
            projectId: req.params.id
        }));
    }
}
