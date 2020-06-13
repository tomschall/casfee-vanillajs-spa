import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewNoteInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field()
  @Length(30, 255)
  description: string;

  @Field()
  @Length(30, 255)
  finishDate: Date;

  @Field()
  @Length(30, 255)
  importance: number;

  @Field()
  @Length(30, 255)
  finished: boolean;
}
