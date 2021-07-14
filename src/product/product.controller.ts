import { Body, Controller, Get, Post, UseGuards, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { RolesUserGuard } from '../auth/auth-jwt-roles-user.guard';
import { RolesUserAuth } from '../auth/decorators/roles.user.decorator';
import { USER_ROLES } from '../user/user.schema';
import { JwtUserAuthGuard } from '../auth/auth-jwt-user.guard';
import { UserPayloadAuth } from '../auth/decorators/user-payload-auth.decorator';
import { PayloadAuthInterface } from '../auth/payload-auth.interface';
import { CreateProductService } from './create-product/create-product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { GetProductListService } from './get-product-list/get-product-list.service';

@Controller('product')
export class ProductController {

    constructor (
        private readonly createProductService: CreateProductService,
        private readonly getProductListService: GetProductListService,
    ){}

    
    @Post()
    @UseGuards(JwtUserAuthGuard)
    createProduct (
        @UserPayloadAuth() payload: PayloadAuthInterface,        
        @Body(new ValidationPipe()) productData: CreateProductDto
    ) {
        return this.createProductService.create(payload.id, productData);
    }

    @Get()
    @RolesUserAuth(USER_ROLES.VENDOR)
    @UseGuards(JwtUserAuthGuard, RolesUserGuard)
    getProductList (
        @UserPayloadAuth() payload: PayloadAuthInterface,
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number
    ) {
        return this.getProductListService.getListProducts(payload.id, page, limit);
    }
}
