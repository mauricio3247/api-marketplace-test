import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtSecureService } from '../jwt-secure/jwt-secure.service';
import { UserFindEmailService } from '../../user/user-find-email/user-find-email.service';
import { PayloadAuthInterface } from '../payload-auth.interface';

@Injectable()
export class AuthUserService {

    constructor (
        private readonly userFindEmailService: UserFindEmailService,
        private readonly jwtSecureService: JwtSecureService,
        @Inject('HELPER_HASH_COMPARE') private readonly helperHashCompare: Function,
    ) {}

    async validateUser (email: string, password: string):Promise<string> {
        try {
            const user = await this.userFindEmailService.findByEmail(email);
            if(user === null || user === undefined) {
                throw new BadRequestException ('Usuario o password incorrecto');
            }

            const response = await this.helperHashCompare(password, user.password);

            if(response === false) {
                throw new BadRequestException ('Usuario o password incorrecto')
            }


            return this.jwtSecureService.encode(user._id, user.email, user.rol);
        } catch (error) {
            throw error
        }
    }


    async refreshToken ({id, email, rol}:PayloadAuthInterface):Promise<{token: string}> {
        const token = await this.jwtSecureService.encode(id, email, rol);
        return {token}
    }

}
