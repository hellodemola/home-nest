import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto } from 'src/common/dto/auth/index.dto';
import { User } from 'src/common/schemas/users';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

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
      return { email: isUser.email, firstName: isUser.firstName };
    }
    return null;
  }

  async Login(user: LoginUserDto) {
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
