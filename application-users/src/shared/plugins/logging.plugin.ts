import { Plugin } from '@nestjs/apollo';
import { ExpressContext } from 'apollo-server-express';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(
    requestContext: GraphQLRequestContext<ExpressContext>,
  ): Promise<GraphQLRequestListener<ExpressContext>> {
    return {
      willSendResponse: async ({ context }) => {
        const {
          request: { query, variables },
        } = requestContext;
        console.log({
          query,
          variables: JSON.stringify(variables),
          service: 'users',
          request_id: context.req.headers['x-request-id'],
        });
      },
    };
  }
}
