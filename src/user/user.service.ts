import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { UserDto } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(userDto: UserDto): Promise<User> {
    const { user_id } = userDto;

    const existingUser = await this.userModel.findOne({ user_id }).exec();

    if (existingUser) {
      throw new ConflictException(`User ID '${user_id}' sudah terdaftar`);
    }

    const newUser = new this.userModel(userDto);
    return await newUser.save();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(user_id: string, userDto: UserDto): Promise<User | null> {
    const existingUser = await this.userModel.findById(user_id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User dengan ID ${user_id} tidak ditemukan`);
    }

    const otherUserWithSameId = await this.userModel
      .findOne({ _id: { $ne: existingUser._id }, user_id })
      .exec();

    if (otherUserWithSameId) {
      throw new ConflictException(`User ID '${user_id}' sudah terdaftar`);
    }

    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(user_id, userDto, { new: true })
        .exec();

      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(
        `Gagal menyimpan pembaruan user: ${error.message}`,
      );
    }
  }

  async delete(user_id: string): Promise<void> {
    const existingUser = await this.userModel.findById(user_id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User dengan ID ${user_id} tidak ditemukan`);
    }
    await this.userModel.findByIdAndDelete(user_id).exec();
  }

  async findOne(username: string, password: string): Promise<User | null> {
    return this.userModel.findOne({ user_id: username, password }).exec();
  }
  async generateToken(user: User): Promise<string> {
    const payload = { sub: user.user_id, level: user.level };
    return this.jwtService.sign(payload);
  }
}
