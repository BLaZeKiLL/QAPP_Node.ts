import { Schema } from '../Modules/mongo';
import moment from 'moment';

import { Quiz } from '../Models/quiz.model';
import { Log } from './logger';

/**
 * Triple mapping
 *
 * @class Dispatcher
 */
class Dispatcher {

  private static stu_email_qid_map: Map<string, string> = new Map<string, string>();
  private static qid_qjson_map: Map<string, string> = new Map<string, string>();

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

  public static async cache(id: Schema.Types.ObjectId): Promise<void> {
    try {
      const quiz = await Quiz.getOne(undefined, id, true);

      const date = moment.utc(quiz.date.toUTCString()).local();
      quiz.date = <any>date.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

      quiz.targetEmails.forEach(email => {
        this.stu_email_qid_map.set(email, quiz._id.toString());
      });

      quiz.results = undefined;
      quiz.targetEmails = undefined;
      Log.main.info(`QUIZ: ${JSON.stringify(quiz)}`);
      this.qid_qjson_map.set(quiz._id.toString(), JSON.stringify(quiz));
    } catch (error) {
      Log.main.info('CACHE ERROR');
    }
  }

  public static clear(): void {
    this.qid_qjson_map.clear();
    this.stu_email_qid_map.clear();
  }

}

export {
  Dispatcher
};
