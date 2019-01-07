import { Quiz } from '../../Models/quiz.model';
import { isTeacher } from '../../Modules/authentication';

export = {
  addQuiz: async (args: any, req: any): Promise<boolean> => {
    isTeacher(req);
    return Quiz.add(args.quiz);
  }
};
