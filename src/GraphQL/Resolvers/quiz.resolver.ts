import { Quiz, IQuizResponse } from '../../Models/quiz.model';
import { isTeacher } from '../../Modules/authentication';
import { Dispatcher } from '../../Modules/dispatcher';
import { Log } from '../../Modules/logger';

export = {
  quiz: (args: any, req: any): IQuizResponse => {
    try {
      return {
        quiz: Dispatcher.get(args.target),
        status: {
          code: 0,
          message: 'OK'
        }
      };
    } catch {
      Log.main.error('QUIZ ERROR');
      return {
        status: {
          code: 2,
          message: 'ERROR'
        }
      };
    }
  },
  addQuiz: async (args: any, req: any): Promise<boolean> => {
    isTeacher(req);
    return Quiz.add(args.quiz);
  }
};
