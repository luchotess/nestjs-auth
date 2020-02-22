import { Module }         from '@nestjs/common';
import { AppController }  from './app.controller';
import { AppService }     from './app.service';
import { AuthModule }     from './auth/auth.module';
import { UsersModule }    from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule }   from '@nestjs/config';
import * as dotenv        from 'dotenv';

dotenv.config();

@Module({
    imports    : [
        AuthModule,
        UsersModule,
        MongooseModule.forRoot(process.env.DB_URL),
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    controllers: [AppController],
    providers  : [AppService]
})
export class AppModule {
}
