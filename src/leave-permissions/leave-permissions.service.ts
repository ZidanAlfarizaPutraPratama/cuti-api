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
    try {
      return await this.LeavePermissionsModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async create(
    leavePermissionsDto: leavePermissionsDto,
  ): Promise<LeavePermissions> {
    try {
      const leave_permissions_id = this.generateLeavePermissionsId();

      const existingLeavePermissions = await this.LeavePermissionsModel.findOne(
        {
          leave_permissions_id,
        },
      ).exec();

      if (existingLeavePermissions) {
        throw new ConflictException(
          `Leave Permissions ID '${leave_permissions_id}' sudah terdaftar`,
        );
      }

      leavePermissionsDto.leave_permissions_id = leave_permissions_id;

      const newLeavePermissions = new this.LeavePermissionsModel(
        leavePermissionsDto,
      );

      return await newLeavePermissions.save();
    } catch (error) {
      throw error;
    }
  }

  generateLeavePermissionsId() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substr(2, 5);

    return `${timestamp}${randomPart}`;
  }

  async findById(id: string): Promise<LeavePermissions | null> {
    try {
      return await this.LeavePermissionsModel.findById(id).exec();
    } catch (error) {
      throw error;
    }
  }

  async delete(
    leave_permissions_id: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
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

      return { success: true, message: 'Izin berhasil dihapus' };
    } catch (error) {
      throw error;
    }
  }
}
