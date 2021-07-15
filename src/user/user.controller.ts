import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors, } from '@nestjs/common';
import { UserListService } from './user-list/user-list.service';
import { RolesUserGuard } from '../auth/auth-jwt-roles-user.guard';
import { RolesUserAuth } from '../auth/decorators/roles.user.decorator';
import { USER_ROLES } from '../user/user.schema';
import { JwtUserAuthGuard } from '../auth/auth-jwt-user.guard';

@Controller('user')
export class UserController {

    constructor (
        private readonly userListService: UserListService,
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    @RolesUserAuth(USER_ROLES.ADMIN)
    @UseGuards(JwtUserAuthGuard, RolesUserGuard)
    getUserList ( ) {
        return this.userListService.list();
    }
}


