/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ConflictException,
} from '@nestjs/common';
import { LeavePermissionsService } from './leave-permissions.service';
import { LeavePermissions, Status } from 'src/schema/leave-permissions.schema';
import { leavePermissionsDto } from 'src/dto/leave-permissions.dto';

@Controller('leave-permissions')
export class LeavePermissionController {
  constructor(
    private readonly leavePermissionsService: LeavePermissionsService,
  ) {}

  @Get()
  async getAllLeavePermission() {
    const result = await this.leavePermissionsService.findAll();
    const resultMapped = result.map((cuti: any) => {
      const tanggal_mulai = cuti.tanggal_mulai.toISOString();
      cuti.sliced_tanggal_mulai = tanggal_mulai.slice(0, 10);

      const tanggal_akhir = cuti.tanggal_akhir.toISOString();
      cuti.sliced_tanggal_akhir = tanggal_akhir.slice(0, 10);

      return cuti;
    });

    return resultMapped;
  }

  @Post()
  async createLeavePermissions(
    @Body() leavePermissionsDto: leavePermissionsDto,
  ): Promise<LeavePermissions> {
    return this.leavePermissionsService.create(leavePermissionsDto);
  }

  @Put(':id')
  updateStatus(
    @Param('id') id: string,
    @Body('status') newStatus: Status,
    @Body() updatedFields: Partial<LeavePermissions>,
  ): Promise<LeavePermissions | null> {
    try {
      return this.leavePermissionsService.updateStatus(
        id,
        newStatus,
        updatedFields,
      );
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async deleteLeavePermissions(
    @Param('id') leave_permissions_id: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.leavePermissionsService.delete(leave_permissions_id);
      return { success: true, message: 'Izin berhasil dihapus' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
