import { Module } from '@nestjs/common';
import { LeavePermissionsService } from './leave-permissions.service';
import { leavePermissionsSchema } from '../schema/leave-permissions.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LeavePermissionController } from './leave-permissions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'LeavePermissions', schema: leavePermissionsSchema },
    ]),
  ],
  controllers: [LeavePermissionController],
  providers: [LeavePermissionsService],
})
export class LeavePermissionModule {}
