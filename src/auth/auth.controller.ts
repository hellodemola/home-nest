import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  LoginUserDto,
  ResetPasswordParamsDto,
} from 'src/common/dto/auth/index.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('v1/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async Login(@Body() req: LoginUserDto) {
    const validateUser = await this.authService.ValidateUser(req);
    if (!validateUser) throw new UnauthorizedException();
    const userDetails = await this.authService.Login(validateUser);
    return {
      message: 'Login user',
      data: userDetails,
      status: 'successfully',
    };
  }

  @UseGuards(AuthGuard)
  @Post('reset-password')
  async ResetPassword(@Body() req: ResetPasswordParamsDto) {
    const isUser = await this.authService.ChangePassword(req.password, req.id);

    return {
      data: isUser,
      message: 'Password change successfully',
      status: 'Success',
    };
  }
}
