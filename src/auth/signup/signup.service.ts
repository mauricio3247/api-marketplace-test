import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { CreateUserService } from '../../user/create-user/create-user.service';
import { AuthUserService } from '../auth-user/auth-user.service';

@Injectable()
export class SignupService {

    constructor (
        private readonly createUserService: CreateUserService,
        private readonly authUserService: AuthUserService,
    ){}

    async signup ({email, password}: CreateUserDto):Promise<{token:string}> {
        try {
            await this.createUserService.create({email, password});
            const token = await this.authUserService.validateUser(email, password);
            return {token}
        } catch (error)  {
            throw error
        }
    }
}
