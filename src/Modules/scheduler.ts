import * as cron from 'cron';
import moment from 'moment';
import { Schema } from './mongo';
import { Dispatcher } from './dispatcher';
import { Log } from './logger';
import { Quiz } from '../Models/quiz.model';
import { Firebase } from './firebase';
import { JSONHandler } from './JSON';

class Scheduler {

  public static schedule(quizID: Schema.Types.ObjectId, date: Date): void {
    const istdate = moment.utc(date.toUTCString()).local();

    Log.main.info(`QUIZ ${quizID} SCHEDULED FOR ${istdate.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')}`);
    new cron.CronJob(istdate.toDate(), async () => {
      try {
        const quiz = await Quiz.getOne(undefined, quizID, true);
        JSONHandler.saveData('./quiz.json', quiz);
        quiz.targets.forEach((target: string) => {
          Firebase.reminder(target);
          Dispatcher.distribute(target, quiz);
        });
      } catch (error) {
        Log.main.error(error);
      }
    }, undefined, true, 'Asia/Kolkata');
  }

}

export {
  Scheduler
};
