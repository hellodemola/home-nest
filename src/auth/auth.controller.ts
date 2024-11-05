import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from 'src/common/dto/auth/index.dto';
import { AuthService } from './auth.service';

@Controller('v1/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async Login(@Body() req: LoginUserDto) {
    const validateUser = await this.authService.ValidateUser(req);
    if (!validateUser)
      throw new HttpException(
        'User or password is not correct',
        HttpStatus.BAD_REQUEST,
      );
    const userDetails = await this.authService.Login(req);
    return {
      message: 'Login user',
      data: userDetails,
      status: 'successfully',
    };
  }
}
