import {  Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, USER_ROLES } from '../user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminUserCreateService {
    
    constructor (
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @Inject('HELPER_HASH') private readonly helperHash: Function,
        private readonly configService: ConfigService,
    ) {}

    async adminCreate ():Promise<boolean> {
        try {
            const email = this.configService.get<string>('config_admin_email')
            const password = this.configService.get<string>('config_admin_password')
            if (await this.userModel.exists({email}) === true) {
                return true
            }
            
            await this.userModel.create({email, password: await this.helperHash(password), rol: USER_ROLES.ADMIN });
            return true
        } catch (error) {
            throw error
        }
    }
}


