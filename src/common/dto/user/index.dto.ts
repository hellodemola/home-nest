import { IsEmail, IsPhoneNumber, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Length(6, 18)
  password: string;

  @Length(3, 18)
  firstName: string;

  @Length(3, 18)
  lastName: string;

  @IsPhoneNumber()
  phone: number;
}

export class UpdateUserDto {
  @Length(6, 18)
  password: string;

  @Length(3, 18)
  firstName: string;

  @Length(3, 18)
  lastName: string;

  @IsPhoneNumber()
  phone: number;
}
