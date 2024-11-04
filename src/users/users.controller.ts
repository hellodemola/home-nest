import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto/user/index.dto';
import { UsersService } from './users.service';

@Controller('v1/api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() req: CreateUserDto) {
    const isUser = await this.userService.create(req);
    if (!isUser) return req.email + ' already exist';
    return isUser;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') param: string) {
    const user = await this.userService.findOne(param);
    if (user) return user;
    return 'User not found';
  }

  @Patch(':email')
  async updateOne(@Body() req: UpdateUserDto, @Param('email') params: string) {
    return await this.userService.updateOne(params, req);
  }

  @Delete(':email')
  async deleteOne(@Param('email') params: string) {
    return await this.userService.deleteOne(params);
  }
}
