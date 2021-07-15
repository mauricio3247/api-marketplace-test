import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateProductService } from './create-product/create-product.service';
import { Product, productSchema } from './product.schema';
import { ProductController } from './product.controller';
import { GetProductListService } from './get-product-list/get-product-list.service';
import { AdminProductController } from './admin-product.controller';
import { ProductFilterService } from './product-filter/product-filter.service';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
              name: Product.name,
              useFactory: () => {
                const schema = productSchema;
                schema.plugin(require('mongoose-paginate-v2'));
                return schema;
              },
            },
          ]),
    ],
  providers: [CreateProductService, GetProductListService, ProductFilterService],
  controllers: [ProductController, AdminProductController]
})
export class ProductModule {}
