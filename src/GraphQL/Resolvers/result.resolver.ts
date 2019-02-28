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
  // do by id
  // getQuizResults: async (args: any, req: any): Promise<IQuizResultsResponse> => {
  //   try {
  //     const quiz = await Quiz.getOne({
  //       No: args.number,
  //       courseCode: args.courseCode
  //     });
  //     const results: IQuizResult[] = [];
  //     quiz.results.forEach(async result => {
  //       const student = await Student.getOne(undefined, result.studentID);
  //       results.push({
  //         score: result.score,
  //         name: student.name,
  //         rollno: student.rollno
  //       });
  //     });
  //     return {
  //       result: results,
  //       status: {
  //         code: 0,
  //         message: 'OK'
  //       }
  //     };
  //   } catch (error) {
  //     Log.main.error('RESULT ERROR');
  //     Log.main.error(error);
  //     return {
  //       status: {
  //         code: 2,
  //         message: 'ERROR'
  //       }
  //     };
  //   }
  // }
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
