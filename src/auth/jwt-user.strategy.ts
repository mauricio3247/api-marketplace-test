import { Injectable } from "@nestjs/common";
//import { ConfigService } from "@nestjs/config";
import {PassportStrategy} from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthUserService } from "./auth-user/auth-user.service";
import { PayloadAuthInterface } from "./payload-auth.interface";

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt-user') {
    constructor (
        private readonly authUserService: AuthUserService,
        //private readonly configService: ConfigService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.AUTH_SECRET
        });
    }

    async validate (payload: PayloadAuthInterface):Promise<PayloadAuthInterface> {
        try {
            return payload
        } catch (error) {
            throw error
        }
    }

}