import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';
import RootResolver from '../../src/GraphQL/Resolvers/index.resolver';


export class GraphQL {

  private static context: GraphQL;

  private schema: GraphQLSchema;

  private constructor() {
    this.schema = makeExecutableSchema({
      typeDefs: `
        ${importSchema(`${__dirname}/../../src/GraphQL/Schemas/index.graphql`)}

        schema {
          query: RootQuery
          mutation: RootMutations
        }
        `,
      resolvers: <any>RootResolver
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
