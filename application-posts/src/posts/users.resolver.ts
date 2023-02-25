import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from './dto/post';
import { User } from './dto/user';
import { PostsService } from './posts.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly postsService: PostsService) {}

  @ResolveField(() => [Post], { complexity: 5 })
  public posts(@Parent() user: User): Post[] {
    return this.postsService.findAllByAuthorId(user.id);
  }
}
