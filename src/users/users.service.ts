import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user/index.dto';
import { User } from 'src/common/interface/users';

@Injectable()
export class UsersService {
  private readonly user: User[] = [];

  create(user: CreateUserDto) {
    this.user.push(user);
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
