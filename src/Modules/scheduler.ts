import * as cron from 'cron';
import { Schema } from './mongo';
import { Dispatcher } from './dispatcher';
import { Quiz } from '../Models/quiz.model';
import { Firebase } from './firebase';

class Scheduler {

  public static schedule(quizID: Schema.Types.ObjectId, date: Date): void {
    new cron.CronJob(date, async () => {
      try {
        const quiz = await Quiz.getOne(undefined, quizID);
        quiz.targets.forEach((target: string) => {
          Dispatcher.distribute(target, quiz);
          Firebase.broadcast(target);
        });
      } catch {

      }
    }, undefined, true, 'Asia/Kolkata');
  }

}

export {
  Scheduler
};
