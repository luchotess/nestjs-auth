import { Module }          from '@nestjs/common';
import { MongooseModule }  from '@nestjs/mongoose';
import { UserSchema }      from 'src/resources/users/users.model';
import { ClientsModule }   from '../clients/clients.module';
import { UsersController } from './users.controller';
import { UsersService }    from './users.service';

@Module({
    imports  : [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        ClientsModule
    ],
    providers: [
        UsersService
    ],
    controllers: [UsersController],
    exports  : [UsersService]
})
export class UsersModule {
}
