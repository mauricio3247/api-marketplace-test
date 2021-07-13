import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum USER_ROLES {
    ADMIN='admin',
    VENDOR='vendor',
}

@Schema({timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})
export class User {

    @Prop({type: String, unique: true, trim: true, lowercase:true, index: true })
    username: string;

    @Prop({type: String})
    password: string;

    createdAt: Date;

    updatedAt: Date;

    @Prop({type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.VENDOR })
    rol: string;
}

export type UserDocument = User & Document;

export const userSchema =  SchemaFactory.createForClass(User);