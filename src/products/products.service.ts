import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/common/schemas/products';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const isProduct = await this.findOne(createProductDto.sku);
    if (!isProduct) {
      const createdAt = new Date();
      const createProduct = new this.ProductModel({
        ...{ createdAt },
        ...createProductDto,
      });
      return createProduct.save();
    }

    throw new HttpException('Product already exist', HttpStatus.CONFLICT);
  }

  findAll() {
    return this.ProductModel.find().exec();
  }

  findOne(sku: string) {
    return this.ProductModel.findOne({ sku });
  }

  update(sku: string, updateProductDto: UpdateProductDto) {
    const update = { $set: updateProductDto };
    const config = { new: true, runValidators: true };
    return this.ProductModel.findOneAndUpdate({ sku }, update, config);
  }

  remove(sku: string) {
    const config = { new: true, runValidators: true };
    return this.ProductModel.findOneAndDelete({ sku }, config);
  }
}
