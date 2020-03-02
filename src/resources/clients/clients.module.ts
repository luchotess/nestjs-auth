import { Module }            from '@nestjs/common';
import { MongooseModule }    from '@nestjs/mongoose';
import { ProjectsModule }    from '../projects/projects.module';
import { ClientsController } from './clients.controller';
import { ClientSchema }      from './clients.model';
import { ClientsService }    from './clients.service';

@Module({
    imports  : [
        MongooseModule.forFeature([{name: 'Client', schema: ClientSchema}]),
        ProjectsModule
    ],
    providers: [
        ClientsService
    ],
    controllers: [ClientsController],
    exports  : [ClientsService, MongooseModule]
})
export class ClientsModule {
}
