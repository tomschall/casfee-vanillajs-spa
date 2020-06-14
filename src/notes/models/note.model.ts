import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Note {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  finishDate: Date;

  @Field()
  importance: number;

  @Field()
  finished: boolean;
}
