import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserService } from './create-user/create-user.service';
import { User, userSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserFindEmailService } from './user-find-email/user-find-email.service';
import { AdminUserCreateService } from './admin-user-create/admin-user-create.service';
import helperHash from '../helpers/hash';
import { ConfigModule } from '@nestjs/config';
import { UserListService } from './user-list/user-list.service';
@Module({
    imports: [
        ConfigModule,
        MongooseModule.forFeature([{ name: User.name, schema: userSchema }])
    ],
    providers: [
        CreateUserService,
        helperHash,
        UserFindEmailService,
        AdminUserCreateService,
        UserListService,
    ],
    controllers: [UserController],
    exports: [CreateUserService, UserFindEmailService, AdminUserCreateService],
})
export class UserModule { }
