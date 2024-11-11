import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto } from 'src/common/dto/auth/index.dto';
import { User } from 'src/common/schemas/users';
import { JwtService } from '@nestjs/jwt';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Password } from 'src/common/helper/hash.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async ValidateUser(user: LoginUserDto) {
    const isUser = await this.userModel.findOne({ email: user.email });
    if (isUser && (await bcrypt.compare(user.password, isUser.password))) {
      return { id: isUser._id };
    }
    return null;
  }

  async Login(user: { id: Types.ObjectId }) {
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async FindUserById(_id: string) {
    const user = await this.userModel.findOne({ _id });
    return user;
  }

  async ChangePassword(password: string, _id: string) {
    const pass = new Password(password);
    const hashPass = await pass.hash();
    const config = { new: true, runValidators: true };
    await this.userModel
      .findOneAndUpdate({ _id }, { password: hashPass }, config)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.NOT_FOUND);
      });
  }
}
