"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_1 = require("graphql");
const graphql_import_1 = require("graphql-import");
const logger_1 = require("../Modules/logger");
const index_resolver_1 = require("./Resolvers/index.resolver");
class GraphBuilder {
    constructor(graphiql) {
        this.graphiql = graphiql;
    }
    getMiddleWare() {
        return express_graphql_1.default({
            schema: this.buildGraphQLSchema(),
            rootValue: index_resolver_1.Resolvers,
            graphiql: this.graphiql,
            formatError: error => {
                logger_1.Log.main.error(error);
                return error;
            }
        });
    }
    buildGraphQLSchema() {
        return graphql_1.buildSchema(`
      ${graphql_import_1.importSchema(`${__dirname}/Schemas/index.graphql`)}

      schema {
        query: Query
        mutation: Mutation
      }
    `);
    }
}
exports.GraphBuilder = GraphBuilder;
//# sourceMappingURL=graphql.js.map