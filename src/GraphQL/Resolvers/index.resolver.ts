import { Query as adminQuery, Mutation as adminMutation } from './admin.resolver';
import { Query as miscQuery, Mutation as miscMutation } from './misc.resolver';
import { Query as questionQuery, Mutation as questionMutation } from './question.resolver';
import { Query as quizQuery, Mutation as quizMutation, Subscription as quizSubscription } from './quiz.resolver';
import { Query as resultQuery, Mutation as resultMutation } from './result.resolver';
import { Query as studentQuery, Mutation as studentMutation } from './student.resolver';
import { Query as teacherQuery, Mutation as teacherMutation } from './teacher.resolver';
import { Log } from '../../Modules/logger';
import { GraphBuilder } from '../graphql';
import { withFilter } from 'graphql-subscriptions';

import { RedisPubSub } from 'graphql-redis-subscriptions';
import { IQuiz } from '../../Models/quiz.model';
const pubsub = new RedisPubSub();

export const Resolvers = {
  // Query
    ...adminQuery,
    ...miscQuery,
    ...questionQuery,
    ...quizQuery,
    ...resultQuery,
    ...studentQuery,
    ...teacherQuery,
  // Mutation
    ...adminMutation,
    ...miscMutation,
    ...questionMutation,
    ...quizMutation,
    ...resultMutation,
    ...studentMutation,
    ...teacherMutation,
  // Subscription
  //  ...quizSubscription
        // expected order first subscribe then resolve
        quizSub: {
          subscribe: withFilter(() => pubsub.asyncIterator('QUIZ_TOPIC'), (payload, variables) => {
            Log.main.info(`QUIZ SUBSCRIBED TO ${variables.email}`);
            // return (<any[]>payload.quizSub.targetEmails).indexOf(variables.email) !== -1;
            return true;
          }),
          resolve: (payload: { quizSub: any; }, args: any, context: any, info: any) => {
            const quiz = <IQuiz>payload.quizSub;
            Log.main.info(`QUIZ RESOLVED`);
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
        }
};
