import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { LoggingPlugin } from './shared/plugins/logging.plugin';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
        context: () => {
          return { requestId: v4() };
        },
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'posts', url: 'http://localhost:3001/graphql' },
            { name: 'users', url: 'http://localhost:3002/graphql' },
          ],
        }),
        buildService: ({ url }) =>
          new RemoteGraphQLDataSource<{ requestId: string }>({
            url,
            willSendRequest: ({ request, context }) => {
              request.http.headers.set('x-request-id', context.requestId);
            },
          }),
      },
    }),
  ],
  providers: [LoggingPlugin],
})
export class AppModule {}
