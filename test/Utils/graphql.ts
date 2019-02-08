import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';
import { Resolvers } from '../../src/GraphQL/Resolvers/index.resolver';


export class GraphQL {

  private static context: GraphQL;

  private schema: GraphQLSchema;

  private constructor() {
    this.schema = makeExecutableSchema({
      typeDefs: `
        ${importSchema(`${__dirname}/../../src/GraphQL/Schemas/index.graphql`)}

        schema {
          query: Query
          mutation: Mutation
        }
        `,
      resolvers: Resolvers
    });
  }

  public static get Executable(): GraphQL {
    if (this.context === undefined) this.context = new GraphQL();
    return this.context;
  }

  public get Schema(): GraphQLSchema {
    return this.schema;
  }

}
