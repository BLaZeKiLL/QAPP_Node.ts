import * as cron from 'cron';
import moment from 'moment';
import { Schema } from './mongo';
import { Dispatcher } from './dispatcher';
import { Log } from './logger';
import { Quiz } from '../Models/quiz.model';
import { Firebase } from './firebase';

class Scheduler {

  public static schedule(quizID: Schema.Types.ObjectId, date: Date): void {
    const istdate = moment.utc(date.toUTCString()).local().toDate();
    // date.setTime(date.getTime() + date.getTimezoneOffset());
    Log.main.info(`QUIZ ${quizID} SCHEDULED FOR ${istdate.toISOString()}`);
    new cron.CronJob(istdate, async () => {
      try {
        const quiz = await Quiz.getOne(undefined, quizID);
        quiz.targets.forEach((target: string) => {
          Firebase.reminder(target);
          Dispatcher.distribute(target, quiz);
        });
      } catch {

      }
    }, undefined, true, 'Asia/Kolkata');
  }

}

export {
  Scheduler
};
