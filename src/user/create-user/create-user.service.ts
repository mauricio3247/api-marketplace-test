import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserResponseDto } from '../dtos/create-user-response.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User, UserDocument } from '../user.schema';

@Injectable()
export class CreateUserService {

    constructor (
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) {}

    async create ({email, password}: CreateUserDto):Promise<CreateUserResponseDto> {
        try {
            if (await this.userModel.exists({email}) === true) {
                throw new BadRequestException({
                    "error": "Bad Request",
                    "message": ["user exist"]
                })
            }
            
            const user = await this.userModel.create({email, password});
            return new CreateUserResponseDto(JSON.parse(JSON.stringify(user)));
        } catch (error) {
            throw error
        }
    }
}
