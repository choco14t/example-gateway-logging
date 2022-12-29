import { ParseIntPipe } from '@nestjs/common';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from './dto/post';
import { User } from './dto/user';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => Post)
  post(@Args({ name: 'id', type: () => ID }, ParseIntPipe) id: number): Post {
    return this.postsService.findOne(id);
  }

  @Query(() => [Post])
  posts(): Post[] {
    return this.postsService.findAll();
  }

  @ResolveField(() => User)
  user(@Parent() post: Post): { __typename: 'User'; id: number } {
    return { __typename: 'User', id: post.authorId };
  }
}
