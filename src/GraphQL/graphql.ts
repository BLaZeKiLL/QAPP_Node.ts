import graphqlHttp, { Middleware } from 'express-graphql';
import { buildSchema, GraphQLSchema } from 'graphql';
import { importSchema } from 'graphql-import';
import { Log } from '../Modules/logger';

import RootResolver from './Resolvers/index.resolver';

export class GraphBuilder {

  constructor(private graphiql: boolean) {}

  public getMiddleWare(): Middleware {
    return graphqlHttp({
      schema: this.buildGraphQLSchema(),
      rootValue: RootResolver,
      graphiql: this.graphiql,
      formatError: error => {
        Log.main.error(error);
        return {
          message: error.message,
          code: 110,
          locations: error.locations,
          path: error.path
        };
      }
    });
  }

  private buildGraphQLSchema(): GraphQLSchema {
    const schema = importSchema('dist/GraphQL/Schemas/index.graphql');
    return buildSchema(`
      ${schema}

      schema {
        query: RootQuery
        mutation: RootMutations
      }
    `);
  }

}
