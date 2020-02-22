import { Module }         from '@nestjs/common';
import { AuthService }    from './auth.service';
import { LocalStrategy }  from 'src/auth/strategies/local.strategy';
import { JwtStrategy }    from 'src/auth/strategies/jwt.strategy';
import { UsersModule }    from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule }      from '@nestjs/jwt';
import { jwtConstants }   from './constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
