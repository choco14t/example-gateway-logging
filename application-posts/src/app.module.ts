import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { User } from './posts/dto/user';
import { PostsModule } from './posts/posts.module';
import { LoggingPlugin } from './shared/plugins/logging.plugin';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      sortSchema: true,
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
    }),
    PostsModule,
  ],
  providers: [LoggingPlugin],
})
export class AppModule {}
