import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<User | null> {
    return this.userService.findById(userId);
  }

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() userDto: UserDto,
  ): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const updatedUser = await this.userService.update(userId, userDto);
      return {
        success: true,
        message: 'User Diperbaharui',
        user: updatedUser,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') user_id: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.userService.delete(user_id);
      return { success: true, message: 'User berhasil dihapus' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
