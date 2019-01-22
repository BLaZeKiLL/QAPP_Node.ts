import * as admin from 'firebase-admin';
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
      Log.main.info('ERROR SUBSCRIBING TO TOPIC : ' + error);
      throw error;
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
      Log.main.info('ERROR UNSUBSCRIBING FROM TOPIC : ' + error);
      throw error;
    }
  }

  public static async quizCardBroadcast(quiz: IQuiz): Promise<boolean> {
    try {
      const message = `${quiz.courseCode} Quiz Scheduled At ${quiz.date}`;
      quiz.questions = undefined;
      quiz.results = undefined;
      quiz._id = undefined;
      quiz.setQuestions = undefined;
      const payload = JSON.stringify(quiz);
      quiz.targets.forEach(async (target: string) => {
        await admin.messaging().sendToTopic(target, {
          data: { quizData: payload },
          notification: {
            title: 'QAPP Quiz',
            body: message
          }
        });
      });
      Log.main.info('QUIZ CARD DATA SENT');
      return true;
    } catch {

    }
  }

  public static async broadcast(target: string) {
    await admin.messaging().sendToTopic(target, {
      data: { request: 'true' },
      notification: {
        title: 'QAPP Quiz',
        body: 'Quiz Reminder'
      }
    });
    Log.main.info('QUIZ REMINDER SENT');
  }

}

export {
  Firebase
};
