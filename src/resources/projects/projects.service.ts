import { Injectable }  from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }   from 'mongoose';
import { BaseDto } from 'src/core/database/base.dto';
import { Project }  from './projects.model';

@Injectable()
export class ProjectsService extends BaseDto {
    requiredFields = ['name', 'code', 'owners', 'type', 'clientId'];

    constructor (@InjectModel('Project') private readonly projectModel: Model<Project>) {
        super(projectModel);
    }
}
