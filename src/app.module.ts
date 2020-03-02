import { Module }         from '@nestjs/common';
import { AppService }     from './app.service';
import { AuthModule }     from './core/auth/auth.module';
import { ClientsModule }  from './resources/clients/clients.module';
import { ProjectsModule } from './resources/projects/projects.module';
import { UsersModule }    from './resources/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule }   from '@nestjs/config';
import * as dotenv        from 'dotenv';

dotenv.config();

@Module({
    imports    : [
        AuthModule,
        UsersModule,
        ClientsModule,
        ProjectsModule,
        MongooseModule.forRoot(process.env.DB_URL),
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    providers  : [AppService]
})
export class AppModule {
}
