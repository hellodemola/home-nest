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

  @Prop([String])
  secondaryEmails: string[];

  @Prop()
  address: string;

  @Prop()
  __id: string;

  @Prop([String])
  secondaryPhones: string[];

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  password: string;

  @Prop()
  role: 'customer' | 'admin';

  @Prop()
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
