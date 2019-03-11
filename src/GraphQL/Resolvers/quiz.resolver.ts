import { Quiz, IQuizResponse, IQuiz } from '../../Models/quiz.model';
import { isTeacher, isStudent } from '../../Modules/authentication';
import { Dispatcher } from '../../Modules/dispatcher';
import { Log } from '../../Modules/logger';

const Query = {
  getQuiz: (args: any, req: any): IQuizResponse => {
    try {
      isStudent(req);
      Log.main.info(`QUIZ REQUESTED FOR ${args.email}`);
      const quizData = Dispatcher.getFromCache(args.email);
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
  },
  getQuizSummary: (args: any, req: any) => {
    try {
      isStudent(req);
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

    return Quiz.add(args.quiz, req.mongoID);
  }
};

export {
  Query,
  Mutation
};
