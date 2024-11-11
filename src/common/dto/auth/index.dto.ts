import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class ResetPasswordDto {
  @Length(6, 18)
  password: string;
}

export class ResetPasswordParamsDto extends ResetPasswordDto {
  @IsNotEmpty()
  id: string;
}
