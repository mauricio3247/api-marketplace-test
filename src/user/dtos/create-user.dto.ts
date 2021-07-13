import {IsNotEmpty, MaxLength, MinLength} from 'class-validator'


export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    readonly username: string;
    
    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(8)
    readonly password: string;
}