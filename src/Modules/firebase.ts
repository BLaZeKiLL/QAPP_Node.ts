import * as admin from 'firebase-admin';
import * as account from '../Static/qapp-firebase-firebase-adminsdk-moh1o-22bcdb968c.json';

import { Log } from './logger';
import { ITarget } from '../Models/misc.model';
import { Quiz, IQuiz } from '../Models/quiz.model';

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
  public static async subscribe(target: ITarget, token: string): Promise<boolean> {
    Log.main.info('SUBSCRIBING');
    try {
      const response = await admin.messaging().subscribeToTopic(token, Firebase.getTopic(target));
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
  public static async unsubscribe(target: ITarget, token: string): Promise<boolean> {
    Log.main.info('UNSUBSCRIBING');
    try {
      const response = await admin.messaging().unsubscribeFromTopic(token, Firebase.getTopic(target));
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
      await admin.messaging().sendToTopic(this.getTopic(quiz.target), {
        data: { quizData: payload },
        notification: {
          title: 'QAPP Quiz',
          body: message
        }
      });
      Log.main.info('QUIZ CARD DATA SENT');
      return true;
    } catch {

    }
  }

  public static broadcast(message?: string, payload?: any) {

  }

  /**
   * return a topic string of specified target
   * @param {Object} target targte object
   * @returns {string} topic string
   */
  private static getTopic(target: ITarget): string {
    return target.branch + target.semester + target.section;
  }

}

export {
  Firebase
};
