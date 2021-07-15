import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../product.schema';
@Injectable()
export class GetProductListService {
    
    constructor (
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    ) {}

    getListProducts (userId: string, page=1, limit=10) {
        return (this.productModel as any).paginate({owner: userId}, {page, limit})
    }

    getListAllProducts ( page=1, limit=10) {
        return (this.productModel as any).paginate({}, {page, limit})
    }

}
