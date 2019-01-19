import { Question, IQuestionResponse, IQuestionsResponse, IQuestionFilter } from '../../Models/question.model';
import { isTeacher } from '../../Modules/authentication';
import { Log } from '../../Modules/logger';

export = {
  getQuestions: async (args: IQuestionFilter, req: any): Promise<IQuestionsResponse> => {
    try {
      isTeacher(req);
      Log.main.info(`QUERY FOR QUESTION: ${args.courseCode}`);
      return {
        questions: await Question.get(args),
        status: {
          code: 0,
          message: 'OK'
        }
      };
    } catch {
      Log.main.error('QUESTIONS ERROR');
      return {
        status: {
          code: 2,
          message: 'ERROR'
        }
      };
    }
  },
  addQuestion: async (args: any, req: any): Promise<IQuestionResponse> => {
    try {
      isTeacher(req);
      return {
        question: await Question.add(args.question),
        status: {
          code: 0,
          message: 'OK'
        }
      };
    } catch {
      Log.main.error('QUESTION ADD ERROR');
      return {
        status: {
          code: 2,
          message: 'ERROR'
        }
      };
    }
  },
  addQuestions: async (args: any, req: any): Promise<IQuestionsResponse> => {
    try {
      isTeacher(req);
      return {
        questions: await Question.addMany(args.questions),
        status: {
          code: 0,
          message: 'OK'
        }
      };
    } catch {
      Log.main.error('QUESTIONS ADD ERROR');
      return {
        status: {
          code: 2,
          message: 'ERROR'
        }
      };
    }
  },
  deleteQuestion: async (args: any, req: any): Promise<boolean> => {
    isTeacher(req);
    return Question.delete(args.id);
  }
};
