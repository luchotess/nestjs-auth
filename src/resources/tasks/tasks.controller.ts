import { Controller, UseGuards } from '@nestjs/common';

import { JwtAuthGuard }   from '../../core/auth/guards/jwt-auth.guard';
import { BaseController } from '../../core/base.controller';
import { TasksService }   from './tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController extends BaseController {
    constructor (private _TasksService: TasksService) {
        super(_TasksService);
    }
}
