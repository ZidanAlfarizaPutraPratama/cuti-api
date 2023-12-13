/* eslint-disable prettier/prettier */
import { Level } from "../schema/user.schema";
export class UserDto {
  email: string;
  no_telepon: string;
  password: string;
  nama_lengkap: string;
  jabatan: string;
  level: Level;
}
