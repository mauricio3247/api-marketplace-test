import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    name: string

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    sku: string


    @IsNotEmpty()
    @IsNumber()
    quantity: number

    @IsNotEmpty()
    @IsNumber()
    price: number

}