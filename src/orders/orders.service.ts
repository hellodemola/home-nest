import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from 'src/common/schemas/orders';
import { Model } from 'mongoose';
import { Transaction } from 'src/common/schemas/transactions';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<Order>,
    @InjectModel(Transaction.name) private TransModel: Model<Transaction>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    const createdAt = new Date();
    const orderId = this.createOrderId(createOrderDto.email);
    const newOrder = new this.OrderModel({
      ...{ createdAt, orderId },
      ...createOrderDto,
    });

    return newOrder.save();
  }

  createOrderId(email) {
    const firstDigits = email.substring(0, 3).toUpperCase();
    const secondDigits = Date.now().toString().slice(-5);
    const rand = Math.floor(Math.random() * 1000);

    return `${firstDigits}-${secondDigits}-${rand}`;
  }

  findAll() {
    return this.OrderModel.find().exec();
  }

  async findOne(orderId: string) {
    const isOrder = await this.OrderModel.findOne({ orderId });
    return isOrder;
  }

  update(_id: string, updateOrderDto: UpdateOrderDto) {
    const update = { $set: updateOrderDto };
    const config = { new: true, runValidators: true };
    return this.OrderModel.findOneAndUpdate({ _id }, update, config);
  }

  remove(_id: string) {
    const config = { new: true, runValidators: true };
    return this.OrderModel.findOneAndDelete({ _id }, config);
  }
}
