import { Question, IQuestionResponse, IQuestionsResponse, IQuestionFilter } from '../../Models/question.model';
import { isTeacher } from '../../Modules/authentication';
import { Log } from '../../Modules/logger';
import { Handle } from '../../Modules/errorHandler';

const Query = {
  getQuestions: async (obj: any, args: IQuestionFilter, req: any): Promise<IQuestionsResponse> => {
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
  }
};

const Mutation = {
  addQuestion: async (obj: any, args: any, req: any): Promise<IQuestionResponse> => {
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
  addQuestions: async (obj: any, args: any, req: any): Promise<IQuestionsResponse> => {
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
  updateQuestion: async (obj: any, args: any, req: any): Promise<boolean> => {
    try {
      isTeacher(req);
      const question: any = {};
      if (args.question.courseCode !== undefined) { question.courseCode = args.question.courseCode; }
      if (args.question.type !== undefined) { question.type = args.question.type; }
      if (args.question.statement !== undefined) { question.statement = args.question.statement; }
      if (args.question.options !== undefined) { question.options = args.question.options; }
      await Question.update(
        question,
        args.question._id
      );
      return true;
    } catch (error) {
      Handle(error);
      return false;
    }
  },
  deleteQuestion: async (obj: any, args: any, req: any): Promise<boolean> => {
    isTeacher(req);
    return Question.delete(args.id);
  }
};

export {
  Query,
  Mutation
};
