import { Status } from '../schema/leave-permissions.schema';
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

export class leavePermissionsDto {
  @IsString()
  @IsNotEmpty()
  leave_permissions_id: string;

  @IsString()
  @IsNotEmpty()
  nama_karyawan: string;

  @IsString()
  @IsNotEmpty()
  keterangan_approval: string;

  @IsNumber()
  @IsNotEmpty()
  tanggal_mulai: Date;

  @IsString()
  @IsNotEmpty()
  tanggal_akhir: Date;

  @IsString()
  @IsNotEmpty()
  alasan: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @IsString()
  @IsNotEmpty()
  tanggal_permohonan: Date;
}
