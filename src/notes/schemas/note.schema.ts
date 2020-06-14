import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Note extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  createDate: Date;

  @Prop({ required: true })
  finishDate: Date;

  @Prop({ required: true })
  importance: number;

  @Prop({ required: true })
  finished: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
