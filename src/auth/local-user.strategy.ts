import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthUserService } from "./auth-user/auth-user.service";

@Injectable()
export class LocalUserStrategy extends PassportStrategy(Strategy, 'local-user') {
    constructor (
        private readonly authUserService: AuthUserService,
    ){
        super({
            usernameField: 'email'
        });
    }

    async validate (email: string, password: string):Promise<string> {
        try {
            const token = await this.authUserService.validateUser(email, password)
            return token
        } catch (error) {
            throw error
        }
    }

}