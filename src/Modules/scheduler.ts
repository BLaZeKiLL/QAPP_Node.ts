import * as cron from 'cron';
import { Schema } from './mongo';
import { Dispatcher } from './dispatcher';
import { Log } from './logger';
import { Quiz } from '../Models/quiz.model';
import { Firebase } from './firebase';

class Scheduler {

  public static schedule(quizID: Schema.Types.ObjectId, date: Date): void {
    date.setTime(date.getTime() + date.getTimezoneOffset());
    Log.main.info(`QUIZ ${quizID} SCHEDULED FOR ${date}`);
    new cron.CronJob(date, async () => {
      try {
        const quiz = await Quiz.getOne(undefined, quizID);
        quiz.targets.forEach((target: string) => {
          Firebase.broadcast(target);
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
