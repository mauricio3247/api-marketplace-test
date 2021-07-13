import {  Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserResponseDto } from '../dtos/create-user-response.dto';
import { User, UserDocument } from '../user.schema';

@Injectable()
export class UserFindEmailService {

    constructor (
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @Inject('HELPER_HASH') private readonly helperHash: Function,
    ) {}

    async findByEmail (email: string):Promise<CreateUserResponseDto> {
        try {
            const user = await this.userModel.findOne({email});
            if(user === null || user === undefined) {
                throw new NotFoundException('User not found')
            }
            return new CreateUserResponseDto(JSON.parse(JSON.stringify(user)));
        } catch (error) {
            throw error
        }
    }
}
