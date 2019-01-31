import { Quiz, IQuizResponse } from '../../Models/quiz.model';
import { isTeacher, isStudent } from '../../Modules/authentication';
import { Dispatcher } from '../../Modules/dispatcher';
import { Log } from '../../Modules/logger';

export = {
  quiz: (args: any, req: any): IQuizResponse => {
    try {
      isStudent(req);
      Log.main.info(`QUIZ REQUESTED FOR ${args.target}`);
      return {
        quiz: Dispatcher.get(args.target),
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
  addQuiz: async (args: any, req: any): Promise<boolean> => {
    isTeacher(req);
    return Quiz.add(args.quiz);
  }
};
