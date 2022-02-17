import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop()
  guid: string;

  @Prop()
  fullName: string;

  @Prop()
  email: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
