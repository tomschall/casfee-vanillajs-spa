import { Field, InputType } from '@nestjs/graphql';
import {
  IsOptional,
  Length,
  MaxLength,
  IsDate,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';

@InputType()
export class NewNoteInput {
  @Field()
  @MaxLength(40)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field()
  @IsDate()
  finishDate: Date;

  @Field()
  @Min(1)
  @Max(5)
  importance: number;

  @Field()
  @IsBoolean()
  finished: boolean;
}
