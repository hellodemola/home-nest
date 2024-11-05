import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto/user/index.dto';
import { User } from 'src/common/schemas/users';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const isUser = await this.findOne(user.email);
    if (!isUser) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(user.password, salt);
      const createUser = new this.userModel({
        ...user,
        password: hashPassword,
      });
      return createUser.save();
    }

    throw new HttpException('User already exist', HttpStatus.CONFLICT);
  }

  findOne(email: string): Promise<User[]> {
    return this.userModel.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateOne(email: string, data: UpdateUserDto) {
    const update = { $set: data };
    const config = { new: true, runValidators: true };
    return this.userModel
      .findOneAndUpdate({ email }, update, config)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      });
  }

  deleteOne(email: string) {
    const config = { new: true, runValidators: true };
    return this.userModel.findOneAndDelete({ email }, config);
  }
}
