import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "../user/user.schema";

export type ProductDocument =  mongoose.Document & Product;

@Schema()
export class Product {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
    owner: User | string;

    @Prop({type: String, index:true })
    name: string
    
    @Prop({type: String, index:true, unique: true })
    sku: string

    @Prop({type: Number })
    quantity: number

    @Prop({type: Number })
    price: number

}

export const productSchema = SchemaFactory.createForClass(Product); 