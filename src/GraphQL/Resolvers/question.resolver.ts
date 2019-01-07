import { Question, IQuestion, IQuestionFilter } from '../../Models/question.model';
import { isTeacher } from '../../Modules/authentication';

export = {
  questions: async (args: IQuestionFilter, req: any): Promise<IQuestion[]> => {
    isTeacher(req);
    return Question.get(args);
  },
  addQuestion: async (args: any, req: any): Promise<IQuestion> => {
    isTeacher(req);
    return Question.add(args.question);
  },
  addQuestions: async (args: any, req: any): Promise<IQuestion[]> => {
    isTeacher(req);
    return Question.addMany(args.questions);
  },
  deleteQuestion: async (args: any, req: any): Promise<boolean> => {
    isTeacher(req);
    return Question.delete(args.id);
  }
};
