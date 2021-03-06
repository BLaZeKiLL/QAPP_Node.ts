import { Quiz, IQuizResponse, IQuizSumaryResponse } from '../../Models/quiz.model';
import { isTeacher, isStudent } from '../../Modules/authentication';
import { Dispatcher } from '../../Modules/dispatcher';
import { Log } from '../../Modules/logger';
import { Teacher } from '../../Models/teacher.model';

const Query = {
  getQuiz: (args: any, req: any): IQuizResponse => {
    try {
      isStudent(req);
      Log.main.info(`QUIZ REQUESTED FOR ${args.email}`);
      const quizData = Dispatcher.getFromCache(args.email);
      return {
        _id: quizData._id,
        JSON: quizData.JSON,
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
  getQuizSummary: async (args: any, req: any): Promise<IQuizSumaryResponse> => {
    try {
      isTeacher(req);
      const teacher = await Teacher.getOne(undefined, args.tid);
      const quizes = await Quiz.Model.find({
        '_id': {
          $in: teacher.quizies
        }
      });
      const summary = quizes.map((quiz: any) => {
        return {
          _id: quiz.id,
          subject: quiz.subject,
          No: quiz.No,
          totalQuestions: quiz.totalQuestions,
          setQuestions: quiz.setQuestions,
          date: quiz.date,
          duration: quiz.duration
        };
      });
      return {
        summary: summary,
        status: {
          code: 0,
          message: 'OK'
        }
      };
    } catch (error) {
      Log.main.error('SUMMARY ERROR');
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
  addQuiz: async (args: any, req: any): Promise<boolean> => {
    isTeacher(req);

    return Quiz.add(args.quiz, req.mongoID);
  }
};

export {
  Query,
  Mutation
};
