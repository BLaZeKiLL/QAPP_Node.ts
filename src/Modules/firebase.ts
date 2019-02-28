import * as admin from 'firebase-admin';
import moment from 'moment';
import * as account from '../Static/qapp-firebase-firebase-adminsdk-moh1o-22bcdb968c.json';

import { Log } from './logger';
import { IQuiz } from '../Models/quiz.model';

// #TODO remove topic specific code
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

  public static async quizCard(id: string, quiz: any): Promise<boolean> {
    try {
      const targets: string[] = quiz.targets;
      const date = moment.utc(quiz.date.toUTCString()).local();
      // date.setTime(date.getTime() + date.getTimezoneOffset());
      quiz.date = <any>date.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

      quiz._id = id;
      quiz.targets = undefined;
      quiz.questions = undefined;
      quiz.results = undefined;
      quiz.setQuestions = undefined;

      // const message = `${quiz.courseCode} Quiz Scheduled At ${quiz.date}`;
      const payload = JSON.stringify(quiz);

      targets.forEach(async (target: string) => {
        await this.dataload(
          target,
          { quizData: payload }
        );
      });

      Log.main.info(`QUIZ CARD DATA SENT: ${JSON.stringify(quiz)}`);
      return true;
    } catch (error) {
      Log.main.error(error);
    }
  }

  public static async reminder(target: string) {
    try {
      await this.dataload(
        target,
        { request: 'true' },
      );
      Log.main.info('QUIZ REMINDER SENT');
    } catch (error) {
      Log.main.error(error);
    }
  }

  public static async reminder_id(deviceIDs: string[]) {
    try {
      await this.dataload_id(
        deviceIDs,
        { request: 'true' },
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

  private static async dataload(topic: string, payload: any): Promise<void> {
    try {
      await admin.messaging().sendToTopic(topic, {
        data: payload,
      });
    } catch (error) {
      Log.main.error('FIREBASE');
      Log.main.error(error);
    }
  }

  private static async dataload_id(deviceIDs: string[], payload: any): Promise<void> {
    try {
      await admin.messaging().sendToDevice(deviceIDs, {
        data: payload,
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
