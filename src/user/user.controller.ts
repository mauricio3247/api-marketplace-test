import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserService } from './create-user/create-user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('user')
export class UserController {

    constructor (
        private readonly createUserService: CreateUserService,
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('signup')
    createUser (@Body(new ValidationPipe()) userData: CreateUserDto ) {
        return this.createUserService.create(userData)
    }
}
