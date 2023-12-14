import { ConflictException, Injectable } from '@nestjs/common';
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
}
