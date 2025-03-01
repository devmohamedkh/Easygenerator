import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.entity';
import {  FilterQuery, Model, UpdateQuery  } from 'mongoose';
import { CreateUserRequest,UserResponseDto } from './dto';
import { GetAllUsersQueries } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(data: CreateUserRequest) {
    try {
      return await this.userModel.create(data);
    } catch (error) {
      if (error?.code === 11000) { 
        throw new BadRequestException('Email already in use');
      }
      throw new InternalServerErrorException('An error occurred while creating the user');
    }
  }

  async getUser(query: FilterQuery<User>):Promise<User>  {
    const user = await this.userModel.findOne(query);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user
  }

  async getUsers({ page, limit, sort, order, search }: GetAllUsersQueries): Promise<User[]> {
    const skip = (page - 1) * limit;
    const sortOrder = order === 'ASC' ? 1 : -1;
    const query: FilterQuery<User> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await this.userModel.find(query)
      .sort({ [sort]: sortOrder }) 
      .skip(skip) 
      .limit(limit)
      .lean()

      return users
    }

  async updateUser(query: FilterQuery<User>, data: UpdateQuery<User>) {
    return this.userModel.findOneAndUpdate(query, data);
  }

}
