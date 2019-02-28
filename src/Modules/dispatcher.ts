import { IQuiz } from '../Models/quiz.model';
import { Log } from './logger';

/**
 * Logic needs to be changed
 *
 * @class Dispatcher
 */
class Dispatcher {

  // #TODO remove conmented code
  // private static quizes: Map<string, {_id: string, JSON: string}> = new Map<string, {_id: string, JSON: string}>();

  private static stu_email_qid_map: Map<string, string> = new Map<string, string>();
  private static qid_qjson_map: Map<string, string> = new Map<string, string>();

  // public static distribute(target: string, quiz: IQuiz): void {
  //   Log.main.info('QUIZ READY FOR DISPATCHING: ' + target);
  //   this.quizes.set(target, { _id: quiz._id.toString(), JSON: JSON.stringify(quiz) });
  // }

  // public static get(target: string): {_id: string, JSON: string} {
  //   const quiz = this.quizes.get(target);
  //   if (quiz === undefined || quiz === null) {
  //     throw new Error('Quiz Not Found');
  //   } else {
  //     Log.main.info('QUIZ DISPATCHED');
  //     return quiz;
  //   }
  // }

  public static getFromCache(email: string): {_id: string, JSON: string} {
    const id = this.stu_email_qid_map.get(email);
    const json = this.qid_qjson_map.get(id);
    console.log(email);
    console.log(id);
    if (json === undefined || json === null || id === undefined || id ===  null) {
      throw new Error('Quiz Not Found');
    } else {
      Log.main.info('QUIZ DISPATCHED');
      return {
        _id: id,
        JSON: json
      };
    }
  }

  public static cache(quiz: IQuiz): void {
    console.log(quiz._id.toString());
    quiz.targetEmails.forEach(email => {
      this.stu_email_qid_map.set(email, quiz._id.toString());
    });

    quiz.results = undefined;
    quiz.targetEmails = undefined;
    Log.main.info(`QUIZ: ${JSON.stringify(quiz)}`);
    this.qid_qjson_map.set(quiz._id.toString(), JSON.stringify(quiz));
  }

  public static clear(): void {
    this.qid_qjson_map.clear();
    this.stu_email_qid_map.clear();
  }

}

export {
  Dispatcher
};
