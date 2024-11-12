import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  sku: string;

  @Prop({ lowercase: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: '_id' })
  varientOf: ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: '_id' }])
  childrendOf: ObjectId[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop([String])
  assets: string[];

  @Prop({ required: true })
  cover: string;

  @Prop()
  price: number;

  @Prop()
  status: boolean;

  @Prop()
  stock: number;

  @Prop()
  updatedAt: Date;

  @Prop([String])
  categories: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
