import { Module }            from '@nestjs/common';
import { MongooseModule }  from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TaskSchema }   from './tasks.model';
import { TasksService }    from './tasks.service';

@Module({
    imports  : [
        MongooseModule.forFeature([{name: 'Task', schema: TaskSchema}])
    ],
    providers: [
        TasksService
    ],
    controllers: [TasksController],
    exports  : [TasksService, MongooseModule]
})
export class TasksModule {
}
