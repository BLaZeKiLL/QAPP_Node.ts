import { GraphQLSchema, buildSchema } from 'graphql';
import { importSchema } from 'graphql-import';


export class GraphQL {

  private static context: GraphQL;

  private schema: GraphQLSchema;

  private constructor() {
    this.schema =  buildSchema(`
      ${importSchema(`${__dirname}/Schemas/index.graphql`)}

      schema {
        query: Query
        mutation: Mutation
      }
    `);
  }

  public static get Executable(): GraphQL {
    if (this.context === undefined) this.context = new GraphQL();
    return this.context;
  }

  public get Schema(): GraphQLSchema {
    return this.schema;
  }

}
