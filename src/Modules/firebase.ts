import * as admin from 'firebase-admin';
import moment from 'moment';
import * as account from '../Static/qapp-firebase-firebase-adminsdk-moh1o-22bcdb968c.json';

import { Log } from './logger';
import { IQuiz } from '../Models/quiz.model';

class Firebase {

  private static url = 'https://qapp-firebase.firebaseio.com';

  public static connect(): void {
    admin.initializeApp({
      credential: admin.credential.cert(<any>account),
      databaseURL: Firebase.url
    });
  }

  /**
   * subscribe a token to a topic
   * @param {Object} target target object
   * @param {string} token device ID
   */
  public static async subscribe(target: string, token: string): Promise<boolean> {
    Log.main.info('SUBSCRIBING');
    try {
      const response = await admin.messaging().subscribeToTopic(token, target);
      Log.main.info('SUCCESSFULLY SUBSCRIBED TO TOPIC : ' + response.successCount);
      return true;
    } catch (error) {
      Log.main.error('FIREBASE');
      Log.main.error(error);
    }
  }

  /**
   * unsubscribe a token to a topic
   * @param {Object} target target object
   * @param {string} token device ID
   */
  public static async unsubscribe(target: string, token: string): Promise<boolean> {
    Log.main.info('UNSUBSCRIBING');
    try {
      const response = await admin.messaging().unsubscribeFromTopic(token, target);
      Log.main.info('SUCCESSFULLY UNSUBSCRIBED FROM TOPIC : ' + response.successCount);
      return true;
    } catch (error) {
      Log.main.error('FIREBASE');
      Log.main.error(error);
    }
  }

  public static async quizCard(quiz: IQuiz): Promise<boolean> {
    try {
      const targets: string[] = quiz.targets;
      const date: Date = moment.utc(quiz.date.toUTCString()).local().toDate();
      // date.setTime(date.getTime() + date.getTimezoneOffset());
      quiz.date = <any>date.toLocaleString();

      quiz.targets = undefined;
      quiz.questions = undefined;
      quiz.results = undefined;
      quiz._id = undefined;
      quiz.setQuestions = undefined;

      const message = `${quiz.courseCode} Quiz Scheduled At ${quiz.date}`;
      const payload = JSON.stringify(quiz);

      targets.forEach(async (target: string) => {
        await this.broadcast(
          target,
          { quizData: payload },
          message,
          'QAPP'
        );
      });

      Log.main.info(`QUIZ CARD DATA SENT FOR ${quiz.date} COMPUTED ${date.toLocaleString()}`);
      return true;
    } catch (error) {
      Log.main.error(error);
    }
  }

  public static async reminder(target: string) {
    try {
      await this.broadcast(
        target,
        { request: 'true' },
        'Quiz Reminder',
        'QAPP'
      );
      Log.main.info('QUIZ REMINDER SENT');
    } catch (error) {
      Log.main.error(error);
    }
  }

  private static async broadcast(topic: string, payload: any, message: string, title: string): Promise<void> {
    try {
      await admin.messaging().sendToTopic(topic, {
        data: payload,
        notification: {
          title: title,
          body: message
        },
      });
    } catch (error) {
      Log.main.error('FIREBASE');
      Log.main.error(error);
    }
  }

}

export {
  Firebase
};
