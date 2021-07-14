import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product, ProductDocument } from '../product.schema';

@Injectable()
export class CreateProductService {
    
    constructor (
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) {}

    async create (userId: string, {name, sku, quantity, price}: CreateProductDto) {
        try {
            const product = await this.productModel.create({
                owner: userId,
                name,
                sku,
                quantity,
                price
            })
            return product;
        } catch (error) {
            throw error
        }
    }
}
