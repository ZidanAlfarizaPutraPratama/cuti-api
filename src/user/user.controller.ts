import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../schema/user.schema';
import { UserDto } from '../dto/user.dto';

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

  @Post('login')
  async login(
    @Body() { user_id, password },
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    const user = await this.userService.findOne(user_id, password);

    if (user) {
      return { success: true, message: 'Berhasil Login' };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  }
  @Post('profile')
  @UseGuards(AuthGuard())
  getProfile(@Req() request: any): string {
    const user = request.user;

    const username = user.user_id;
    const level = user.level;

    return `Welcome, ${username}! Your level is ${level}.`;
  }
}
