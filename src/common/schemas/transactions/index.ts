import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @Prop({ required: true })
  gateway: 'paystack' | 'transfer' | 'wallet' | 'topup' | 'refunds';

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  paymentRef: string;

  @Prop()
  isVerified: boolean;

  @Prop({ required: true })
  status: 'pending' | 'failed' | 'success';

  @Prop({ required: true })
  createdAt: Date;

  @Prop([Date])
  updatedAt: Date[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId }])
  updatedBy: ObjectId[];
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
