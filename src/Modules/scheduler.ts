import * as cron from 'cron';
import * as passwordGenerator from 'randomstring';
import { Quiz, IQuiz } from '../Models/quiz.model';
import moment from 'moment';
import { Schema } from './mongo';
import { Dispatcher } from './dispatcher';
import { Log } from './logger';
import { Firebase } from './firebase';
import { JSONHandler } from './JSON';
import { Student } from '../Models/student.model';
import { Postman } from './postman';

class Scheduler {

  public static schedule(quizID: Schema.Types.ObjectId, date: Date): void {
    const istdate = moment.utc(date.toUTCString()).local();

    Log.main.info(`QUIZ ${quizID} SCHEDULED FOR ${istdate.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')}`);
    new cron.CronJob(istdate.toDate(), async () => {
      try {
        const quiz = await Quiz.getOne(undefined, quizID, true);
        JSONHandler.saveData('quiz.json', quiz);
        quiz.targetEmails.forEach((target: string) => {
          Firebase.reminder(target);
          Dispatcher.distribute(target, quiz);
        });
      } catch (error) {
        Log.main.error(error);
      }
    }, undefined, true, 'Asia/Kolkata');
  }

  public static async process(emails: string[]): Promise<void> {
    try {
      const stu_accounts = await Student.Model.find({
        'email': {
          $in: emails
        }
      });
      Firebase.reminder_id(<string[]>stu_accounts.map(student => (<any>student).deviceID));
      const stu_emails = <string[]>stu_accounts.map(student => (<any>student).email);
      Log.main.info(`OLD ACCOUNTS: ${JSON.stringify(stu_emails)}`);

      const new_emails = emails.filter(x => stu_emails.indexOf(x) === -1);
      Log.main.info(`NEW ACCOUNTS: ${JSON.stringify(new_emails)}`);
      new_emails.forEach(email => {
        const password = passwordGenerator.generate(6);
        Postman.accountMail(email, 'Student', password);
        Student.add({
          email: email,
          password: password
        });
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}

export {
  Scheduler
};
