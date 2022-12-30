import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [PostsResolver, PostsService, UsersResolver],
})
export class PostsModule {}
