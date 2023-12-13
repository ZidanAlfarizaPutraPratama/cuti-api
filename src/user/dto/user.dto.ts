/* eslint-disable prettier/prettier */
import { Level } from "../schema/user.schema";
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  no_telepon: string;

  @IsNumber()
  @IsNotEmpty()
  kuota: number;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  nama_lengkap: string;

  @IsString()
  @IsNotEmpty()
  jabatan: string;

  @IsEnum(Level)
  @IsNotEmpty()
  level: Level;
}
