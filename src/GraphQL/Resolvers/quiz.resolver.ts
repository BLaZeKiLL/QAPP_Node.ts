import { Quiz, IQuizResponse, IQuiz } from '../../Models/quiz.model';
import { isTeacher, isStudent } from '../../Modules/authentication';
import { Dispatcher } from '../../Modules/dispatcher';
import { Log } from '../../Modules/logger';
import { GraphBuilder } from '../graphql';
import { withFilter } from 'graphql-subscriptions';

const Query = {
  // logic change
  getQuiz: (args: any, req: any): IQuizResponse => {
    try {
      isStudent(req);
      Log.main.info(`QUIZ REQUESTED FOR ${args.target}`);
      const quizData = Dispatcher.get(args.target);
      return {
        _id: quizData._id,
        JSON: quizData.JSON,
        status: {
          code: 0,
          message: 'OK'
        }
      };
    } catch (error) {
      Log.main.error('QUIZ ERROR');
      Log.main.error(error);
      return {
        status: {
          code: 2,
          message: 'ERROR'
        }
      };
    }
  }
};

const Mutation = {
  addQuiz: async (args: any, req: any): Promise<boolean> => {
    isTeacher(req);
    return Quiz.add(args.quiz);
  }
};

const Subscription = {
  // expected order first subscribe then resolve
  quizSub: {
    subscribe: withFilter(() => GraphBuilder.Subscriber.asyncIterator('QUIZ_TOPIC'), (payload, variables) => {
      return (<any[]>payload.quizSub.targetEmails).indexOf(variables.email) !== -1;
    }),
    resolve: (payload: { quizSub: any; }, args: any, context: any, info: any) => {
      const quiz = <IQuiz>payload.quizSub;

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

export {
  Query,
  Mutation,
  Subscription
};
