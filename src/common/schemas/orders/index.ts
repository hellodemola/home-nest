import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true, lowercase: true })
  email: string;

  @Prop()
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

  @Prop()
  subtotal: number;

  @Prop()
  total: number;

  @Prop()
  discount: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop([])
  items: {
    product: string;
    sku: string;
    price: number;
  }[];

  @Prop()
  paymentRef: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
