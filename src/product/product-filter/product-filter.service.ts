import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../product.schema';

@Injectable()
export class ProductFilterService {
    constructor (
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) {}

    getListProducts (name="", sku="", priceMin=0, priceMax=0) {

        let and = []
        let query = {}
        if(name !== undefined && name !== "") {
            and = [...and, {'name': {'$regex': name}}]
        }

        if(sku !== undefined && sku !== "") {
            and = [...and, {'sku': {'$regex': sku}}]
        }

        if(priceMin !== undefined && priceMin > 0) {
            priceMin= Number(priceMin)
            and = [...and, {'price': {$gte: priceMin}}]
        }


        if(priceMax !== undefined && priceMax > 0) {
            priceMax= Number(priceMax)
            and = [...and, {'price': {$lte: priceMax}}]
        }

        if(and.length > 0) {
            query = {$and: and}
        }

        return this.productModel.find(query);
    }

}
