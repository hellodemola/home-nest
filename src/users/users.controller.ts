import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user/index.dto';
import { UsersService } from './users.service';

@Controller('v1/api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() req: CreateUserDto) {
    const isUser = await this.userService.create(req);
    return isUser;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') param: string) {
    const user = this.userService.findOne(param);
    if (user) return user;
    return 'User not found';
  }
}
