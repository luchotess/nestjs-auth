import { Injectable }  from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }       from 'mongoose';

import { BaseDto } from 'src/core/database/base.dto';
import { Task }    from './tasks.model';

@Injectable()
export class TasksService extends BaseDto {
    requiredFields = ['description'];

    constructor (@InjectModel('Task') private readonly taskModel: Model<Task>) {
        super(taskModel);
    }
}
