import { GraphQLSchema, buildSchema } from 'graphql';
import { importSchema } from 'graphql-import';
import { Resolvers } from '../../src/GraphQL/Resolvers/index.resolver';
import { graphql } from 'graphql';

export class GraphQLTest {

  private static context: GraphQLTest;

  private schema: GraphQLSchema;

  private constructor() {
    this.schema =  buildSchema(`
      ${importSchema(`${__dirname}/../../src/GraphQL/Schemas/index.graphql`)}

      schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
      }
    `);
  }

  public static get Schema(): GraphQLTest {
    if (this.context === undefined) this.context = new GraphQLTest();
    return this.context;
  }

  public async execute(operation: any, vars: any): Promise<any> {
    try {
      return await <any>graphql(this.schema, operation, Resolvers, undefined, vars);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

}
