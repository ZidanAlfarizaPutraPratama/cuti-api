import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum Status {
  OPEN = 'OPEN',
  PROCES = 'PROCESS',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}

@Schema()
export class LeavePermissions {
  @Prop({ type: String, unique: true, required: true })
  leave_permissions_id: string;

  @Prop({ default: '-' })
  approved_by: string;

  @Prop()
  nama_lengkap: string;

  @Prop({ default: '-' })
  keterangan_approval: string;

  @Prop()
  tanggal_mulai: Date;

  @Prop()
  tanggal_akhir: Date;

  @Prop()
  alasan: string;

  @Prop({
    type: String,
    enum: Status,
  })
  status: Status;
}
export const leavePermissionsSchema =
  SchemaFactory.createForClass(LeavePermissions);
