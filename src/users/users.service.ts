import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/common/dto/user/index.dto';
import { User } from 'src/common/interface/users';

@Injectable()
export class UsersService {
  private readonly user: User[] = [];

  async create(user: CreateUserDto) {
    const isUser = this.findOne(user.email);
    if (isUser) return `${isUser.email} already exits`;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(user.password, salt);
    this.user.push({ ...user, password: hashPassword });
    return `${user.email} added successfully`;
  }

  findOne(email: string): User {
    const isUser = this.user.find((user) => user.email === email);
    if (isUser) return isUser;
    return null;
  }

  findAll(): User[] {
    return this.user;
  }
}
