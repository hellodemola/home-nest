import { Transform } from 'class-transformer';
import { IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  name: string;

  @IsUrl()
  cover: string;

  @IsString()
  @Length(6, 20)
  sku: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  categories: string;
}
