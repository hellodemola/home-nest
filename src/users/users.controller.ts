import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
    return {
      data: isUser,
      message: `${isUser.email} has been successfully added`,
      status: 'success',
    };
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return {
      data: users,
      message: '',
      status: 'success',
    };
  }

  @Get(':email')
  async findOne(@Param('email') param: string) {
    const user = await this.userService.findOne(param);
    if (user)
      return {
        data: user,
        message: `details of ${param} found`,
        status: 'success',
      };
    throw new HttpException(`${param} not found`, HttpStatus.NOT_FOUND);
  }

  @Patch(':email')
  async updateOne(@Body() req: UpdateUserDto, @Param('email') params: string) {
    const user = await this.userService.updateOne(params, req);
    if (user)
      return {
        data: user,
        message: `${params} updated`,
        status: 'success',
      };
    throw new HttpException(`${params} not found`, HttpStatus.NOT_FOUND);
  }

  @Delete(':email')
  async deleteOne(@Param('email') params: string) {
    const user = await this.userService.deleteOne(params);
    if (user)
      return {
        message: `${params} has been deleted`,
        status: 'success',
      };
    throw new HttpException(`${params} not found`, HttpStatus.NOT_FOUND);
  }
}
