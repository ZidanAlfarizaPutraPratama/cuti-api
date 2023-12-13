import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(userDto: UserDto): Promise<User> {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(user_id: string, userDto: UserDto): Promise<User | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(user_id, userDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    return updatedUser;
  }

  async delete(user_id: string): Promise<void> {
    const deletedUser = await this.userModel.findByIdAndDelete(user_id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
  }
}
