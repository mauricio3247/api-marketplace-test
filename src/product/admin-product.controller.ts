import { Body, Controller, Get, Post, UseGuards, ValidationPipe, Query, ParseIntPipe, Param } from '@nestjs/common';
import { RolesUserGuard } from '../auth/auth-jwt-roles-user.guard';
import { RolesUserAuth } from '../auth/decorators/roles.user.decorator';
import { USER_ROLES } from '../user/user.schema';
import { JwtUserAuthGuard } from '../auth/auth-jwt-user.guard';
import { GetProductListService } from './get-product-list/get-product-list.service';

@Controller('admin/product')
export class AdminProductController {

    constructor (
        private readonly getProductListService: GetProductListService,
    ){}

    @Get()
    @RolesUserAuth(USER_ROLES.ADMIN)
    @UseGuards(JwtUserAuthGuard, RolesUserGuard)
    getProductList (
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
    ) {
        return this.getProductListService.getListAllProducts( page, limit);
    }

    @Get(':id')
    @RolesUserAuth(USER_ROLES.ADMIN)
    @UseGuards(JwtUserAuthGuard, RolesUserGuard)
    getProductListByUserId (
        @Param('id') id: string,
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
    ) {
        return this.getProductListService.getListProducts(id, page, limit);
    }
}
