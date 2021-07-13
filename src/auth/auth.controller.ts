import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { JwtUserAuthGuard } from './auth-jwt-user.guard';
import { LocalUserAuthGuard } from './auth-local-user.guard';
import { AuthUserService } from './auth-user/auth-user.service';
import { UserPayloadAuth } from './decorators/user-payload-auth.decorator';
import { UserTokenAuth } from './decorators/user-token-auth.decorator';
import { PayloadAuthInterface } from './payload-auth.interface';
import { SignupService } from './signup/signup.service';

@Controller('auth')
export class AuthController {

    constructor (
        private readonly authUserService: AuthUserService,
        private readonly signupService: SignupService,
    ) {}

    
    @Post('sign-in')
    @UseGuards(LocalUserAuthGuard)
    signIn(
        @UserTokenAuth() token: string
    ) {
        return {token}
    }


    @Post('sign-up')
    signUp (
        @Body(new ValidationPipe()) userData: CreateUserDto
    ) {
        return this.signupService.signup(userData);
    }

    @Get('me')
    @UseGuards(JwtUserAuthGuard)
    profile(
        @UserPayloadAuth() payload: PayloadAuthInterface
    ) {
        return payload
    }


    @Get('refresh')
    @UseGuards(JwtUserAuthGuard)
    refreshToken(
        @UserPayloadAuth() payload: PayloadAuthInterface
    ) {
        return this.authUserService.refreshToken(payload)
    }


}
