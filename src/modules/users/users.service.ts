import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findMany(): Promise<UserDocument[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOneById(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);
    newUser.save();
    return newUser;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument | null> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return user;
  }

  async deleteOne(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return `User with id: ${id} was succesfully deleted.`;
  }
}
