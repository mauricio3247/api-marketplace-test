import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserService } from './create-user/create-user.service';
import { User, userSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserFindEmailService } from './user-find-email/user-find-email.service';
import helperHash from '../helpers/hash';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: userSchema }])
    ],
    providers: [
        CreateUserService,
        helperHash,
        UserFindEmailService,
    ],
    controllers: [UserController],
    exports: [CreateUserService, UserFindEmailService],
})
export class UserModule { }
