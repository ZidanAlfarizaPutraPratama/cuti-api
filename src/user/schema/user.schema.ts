/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Level {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Schema({
    timestamps: false
})
export class User {
    @Prop()
    email: string;

    @Prop()
    no_telepon: string;

    @Prop()
    password: string;

    @Prop()
    nama_lengkap: string;

    @Prop()
    jabatan: string;

    @Prop({
        type: String,
        enum: Level,
    })
    level: Level;
}
export const UserSchema = SchemaFactory.createForClass(User)