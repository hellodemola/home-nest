import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  password: string;

  @Prop()
  role: 'customer' | 'admin';
}

export const UserSchema = SchemaFactory.createForClass(User);
