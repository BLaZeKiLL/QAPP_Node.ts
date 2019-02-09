import graphqlHttp, { Middleware } from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';
import { importSchema } from 'graphql-import';
import { Log } from '../Modules/logger';

import { Resolvers } from './Resolvers/index.resolver';

export class GraphBuilder {

  constructor(private graphiql: boolean) {}

  public getMiddleWare(): Middleware {
    return graphqlHttp({
      schema: this.buildGraphQLSchema(),
      rootValue: Resolvers,
      graphiql: this.graphiql,
      formatError: error => {
        Log.main.error(error);
        Log.main.error(JSON.stringify(error.source));
        Log.main.error(JSON.stringify(error.locations));
        Log.main.error(error.stack);
        return error;
      }
    });
  }

  private buildGraphQLSchema(): GraphQLSchema {
    return buildSchema(`
      ${importSchema(`${__dirname}/Schemas/index.graphql`)}

      schema {
        query: Query
        mutation: Mutation
      }
    `);
  }

}
