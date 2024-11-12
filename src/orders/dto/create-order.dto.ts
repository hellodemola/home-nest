import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateOrderDto {
  @IsEmail()
  email: string;

  @IsString()
  status: 'pending';

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsNotEmpty()
  subtotal: number;

  @IsArray()
  @IsNotEmpty()
  items: {
    product: string;
    sku: string;
    price: string;
  };
}

export class FindOrderDto {
  id: ObjectId;
}
