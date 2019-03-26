import { IAddResultResponse, Result, IQuizResultsResponse, IQuizResult } from '../../Models/result.model';
import { isStudent } from '../../Modules/authentication';
import { Handle } from '../../Modules/errorHandler';
import { Student } from '../../Models/student.model';
import { Quiz } from '../../Models/quiz.model';
import { Log } from '../../Modules/logger';

// #TODO implement resolvers
const Query = {
  getStudentResults: async (args: any, req: any) => {

  },
  getQuizResults: async (args: any, req: any): Promise<IQuizResultsResponse> => {
    try {
      const quiz = await Quiz.getOneFlat(undefined, args.quizID);
      const results: IQuizResult[] = [];
      const result_docs = await Result.get(<any>quiz.results);
      for (let i = 0; i < quiz.results.length; i++) {
        const result = result_docs[i];
        const student = await Student.getOne(undefined, result.studentID);
        results.push({
          score: result.score,
          email: student.email
        });
      }
      Log.main.info(`RESULT ${JSON.stringify(results)}`);
      return {
        result: results,
        status: {
          code: 0,
          message: 'OK'
        }
      };
    } catch (error) {
      Log.main.error('RESULT ERROR');
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
  addResult: async (args: any, req: any): Promise<IAddResultResponse> => {
    try {
      isStudent(req);
      const result = await Result.addResult(args.result);
      Log.main.info(`RESULT ADDED: ${JSON.stringify(result)}`);
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
