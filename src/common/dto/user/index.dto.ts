import { IsEmail, IsPhoneNumber, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @Length(6, 18)
  password: string;

  @Length(3, 18)
  @Transform(({ value }) => value.trim().toLowerCase())
  firstName: string;

  @Length(3, 18)
  @Transform(({ value }) => value.trim().toLowerCase())
  lastName: string;

  @IsPhoneNumber()
  phone: number;
}

export class UpdateUserDto {
  @Length(3, 18)
  @Transform(({ value }) => value.trim().toLowerCase())
  firstName: string;

  @Length(3, 18)
  @Transform(({ value }) => value.trim().toLowerCase())
  lastName: string;

  @IsPhoneNumber()
  phone: number;
}
