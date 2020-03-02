import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard }          from '../../core/auth/guards/jwt-auth.guard';
import { BaseController }  from '../../core/base.controller';
import { ProjectsService } from './projects.service';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController extends BaseController {
    constructor (private _ProjectsService: ProjectsService) {
        super(_ProjectsService);
    }
}
