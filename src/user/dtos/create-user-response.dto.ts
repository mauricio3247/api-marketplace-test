import { Exclude, Expose } from 'class-transformer'

export class CreateUserResponseDto {


    username: string
    rol: string

    @Exclude()
    password: string

    @Expose({ name: 'id'})
    _id: string

    @Exclude()
    __v: number

    constructor(partial: Partial<CreateUserResponseDto>) {
        Object.assign(this, partial);
    }
}