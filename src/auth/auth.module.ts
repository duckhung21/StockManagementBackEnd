import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from './auth.service';
import { jwtConstants } from './constant';
import { AuthController } from "../auth/auth.controller";
import { UsersModule } from '../Modules/user.module';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
    imports: [ UsersModule ,PassportModule, JwtModule.register({secret: jwtConstants.secret, signOptions: {expiresIn: '1h'}})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    // exports: [AuthService]
})

export class AuthModule {}