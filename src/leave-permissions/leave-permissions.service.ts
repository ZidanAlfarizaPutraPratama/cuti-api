import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeavePermissions } from 'src/schema/leave-permissions.schema';
import { leavePermissionsDto } from 'src/dto/leave-permissions.dto';

@Injectable()
export class LeavePermissionsService {
  constructor(
    @InjectModel(LeavePermissions.name)
    private readonly LeavePermissionsModel: Model<LeavePermissions>,
  ) {}

  async findAll(): Promise<LeavePermissions[]> {
    return this.LeavePermissionsModel.find().exec();
  }

  async create(
    leavePermissionsDto: leavePermissionsDto,
  ): Promise<LeavePermissions> {
    const { leave_permissions_id } = leavePermissionsDto;

    const existingLeavePermissions = await this.LeavePermissionsModel.findOne({
      leave_permissions_id,
    }).exec();

    if (existingLeavePermissions) {
      throw new ConflictException(
        `Leave Permissions ID '${leave_permissions_id}' sudah terdaftar`,
      );
    }

    const newLeavePermissions = new this.LeavePermissionsModel(
      leavePermissionsDto,
    );
    return await newLeavePermissions.save();
  }

  async findById(id: string): Promise<LeavePermissions | null> {
    return this.LeavePermissionsModel.findById(id).exec();
  }
  async delete(leave_permissions_id: string): Promise<void> {
    const existingLeavePermissions =
      await this.LeavePermissionsModel.findById(leave_permissions_id).exec();
    if (!existingLeavePermissions) {
      throw new NotFoundException(
        `Izin dengan ID ${leave_permissions_id} tidak ditemukan`,
      );
    }
    await this.LeavePermissionsModel.findByIdAndDelete(
      leave_permissions_id,
    ).exec();
  }
}
