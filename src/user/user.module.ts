import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserService } from './create-user/create-user.service';
import { User, userSchema } from './user.schema';
import { UserController } from './user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: userSchema }])
    ],
    providers: [CreateUserService],
    controllers: [UserController]
})
export class UserModule { }
