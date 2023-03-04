import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BeerDocument = HydratedDocument<Beer>;

@Schema()
export class Beer {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  style: string;

  @Prop({ required: true })
  hop: string;

  @Prop({ required: true })
  yeast: string;

  @Prop({ required: true })
  malts: string;

  @Prop({ required: true })
  ibu: number;

  @Prop({ required: true })
  alcohol: number;

  @Prop({ required: true })
  blg: number;

  @Prop({ required: true, default: 0 })
  randomCount: number;
}

export const BeerSchema = SchemaFactory.createForClass(Beer);
