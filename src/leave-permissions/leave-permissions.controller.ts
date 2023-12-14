import { Controller, Get, Post, Body } from '@nestjs/common';
import { LeavePermissionsService } from './leave-permissions.service';
import { LeavePermissions } from 'src/schema/leave-permissions.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { leavePermissionsDto } from 'src/dto/leave-permissions.dto';

@Controller('leave-permissions')
export class LeavePermissionController {
  constructor(
    private readonly leavePermissionsService: LeavePermissionsService,
  ) {}

  @Get()
  async getAllLeavePermission(): Promise<LeavePermissions[]> {
    return this.leavePermissionsService.findAll();
  }

  @Post()
  async createLeavePermissions(
    @Body() leavePermissionsDto: leavePermissionsDto,
  ): Promise<LeavePermissions> {
    return this.leavePermissionsService.create(leavePermissionsDto);
  }
}
