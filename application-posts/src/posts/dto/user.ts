import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from './post';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  @Directive('@external')
  id: number;

  @Field(() => [Post])
  posts?: Post[];
}
