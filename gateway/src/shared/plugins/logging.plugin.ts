import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
} from 'apollo-server-plugin-base';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(
    requestContext: GraphQLRequestContext<{ requestId: string }>,
  ): Promise<void> {
    console.log(`send request_id: ${requestContext.context.requestId}`);
  }
}
