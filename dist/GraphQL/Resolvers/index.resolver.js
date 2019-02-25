"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_resolver_1 = require("./admin.resolver");
const misc_resolver_1 = require("./misc.resolver");
const question_resolver_1 = require("./question.resolver");
const quiz_resolver_1 = require("./quiz.resolver");
const result_resolver_1 = require("./result.resolver");
const student_resolver_1 = require("./student.resolver");
const teacher_resolver_1 = require("./teacher.resolver");
const logger_1 = require("../../Modules/logger");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const pubsub = new graphql_redis_subscriptions_1.RedisPubSub();
exports.Resolvers = Object.assign({}, admin_resolver_1.Query, misc_resolver_1.Query, question_resolver_1.Query, quiz_resolver_1.Query, result_resolver_1.Query, student_resolver_1.Query, teacher_resolver_1.Query, admin_resolver_1.Mutation, misc_resolver_1.Mutation, question_resolver_1.Mutation, quiz_resolver_1.Mutation, result_resolver_1.Mutation, student_resolver_1.Mutation, teacher_resolver_1.Mutation, { 
    // Subscription
    //  ...quizSubscription
    // expected order first subscribe then resolve
    quizSub: {
        subscribe: graphql_subscriptions_1.withFilter(() => pubsub.asyncIterator('QUIZ_TOPIC'), (payload, variables) => {
            logger_1.Log.main.info(`QUIZ SUBSCRIBED TO ${variables.email}`);
            // return (<any[]>payload.quizSub.targetEmails).indexOf(variables.email) !== -1;
            return true;
        }),
        resolve: (payload, args, context, info) => {
            const quiz = payload.quizSub;
            logger_1.Log.main.info(`QUIZ RESOLVED`);
            quiz.results = undefined;
            quiz.targetEmails = undefined;
            quiz.creator = undefined;
            return {
                _id: quiz._id,
                JSON: JSON.stringify(quiz),
                status: {
                    code: 0,
                    message: 'OK'
                }
            };
        }
    } });
//# sourceMappingURL=index.resolver.js.map