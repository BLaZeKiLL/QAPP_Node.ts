import { IResultResponse, Result } from '../../Models/result.model';
import { isStudent } from '../../Modules/authentication';
import { Handle } from '../../Modules/errorHandler';
import { Student } from '../../Models/student.model';
import { Quiz } from '../../Models/quiz.model';

const Query = {
  getStudentResults: async (args: any, req: any) => {

  },
  getQuizResults: async (args: any, req: any) => {

  }
};

const Mutation = {
  addResult: async (args: any, req: any): Promise<IResultResponse> => {
    try {
      isStudent(req);
      const result = await Result.addResult(args.result);
      Student.addResult({results: result._id}, result.studentID);
      Quiz.addResult({results: result._id}, result.quizID);
      return {
        result: result,
        status: {
          message: 'Ok',
          code: 0
        }
      };
    } catch (error) {
      return {
        status: Handle(error)
      };
    }
  }
};

export {
  Query,
  Mutation
};
