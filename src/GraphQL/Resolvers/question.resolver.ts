import { Question, IQuestionResponse, IQuestionsResponse, IQuestionFilter } from '../../Models/question.model';
import { isTeacher } from '../../Modules/authentication';
import { Log } from '../../Modules/logger';
import { Handle } from '../../Modules/errorHandler';

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
    } catch (error) {
      return {
        status: Handle(error)
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
    } catch (error) {
      return {
        status: Handle(error)
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
    } catch (error) {
      return {
        status: Handle(error)
      };
    }
  },
  updateQuestion: async (args: any, req: any): Promise<boolean> => {
    try {
      isTeacher(req);
      await Question.update(
        {
          courseCode: args.question.courseCode,
          statement: args.question.statement,
          type: args.question.type,
          options: args.question.options
        },
        args.question._id
      );
      return true;
    } catch (error) {
      Handle(error);
      return false;
    }
  },
  deleteQuestion: async (args: any, req: any): Promise<boolean> => {
    isTeacher(req);
    return Question.delete(args.id);
  }
};
