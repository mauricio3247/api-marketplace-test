import {  Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserResponseDto } from '../dtos/create-user-response.dto';
import { User, UserDocument } from '../user.schema';


@Injectable()
export class UserListService {
    constructor (
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @Inject('HELPER_HASH') private readonly helperHash: Function,
    ) {}

    async list ():Promise<CreateUserResponseDto[]> {
        try {
            const users = await this.userModel.find({});

            return users.map(user=> new CreateUserResponseDto(JSON.parse(JSON.stringify(user))));
        } catch (error) {
            throw error
        }
    }


}



