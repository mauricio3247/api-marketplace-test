import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtSecureService } from './jwt-secure/jwt-secure.service';
import { AuthUserService } from './auth-user/auth-user.service';
import { SignupService } from './signup/signup.service';
import helperHashCompare from '../helpers/hash.compare';
import { LocalUserStrategy } from './local-user.strategy';
import { AuthController } from './auth.controller';
import { JwtUserStrategy } from './jwt-user.strategy';

@Module({
    imports: [
        PassportModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('auth_secret'),
                signOptions: { expiresIn: configService.get<string>('auth_expires_in') }
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [JwtSecureService, AuthUserService, helperHashCompare, SignupService, LocalUserStrategy, JwtUserStrategy],
    exports: [JwtModule, LocalUserStrategy, JwtUserStrategy],
    controllers: [AuthController]
})
export class AuthModule { }
