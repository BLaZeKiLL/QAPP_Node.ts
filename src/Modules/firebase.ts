import * as admin from 'firebase-admin';
import * as account from '../Static/qapp-firebase-firebase-adminsdk-moh1o-22bcdb968c.json';

import { Log } from './logger';

// #TODO remove topic specific code
class Firebase {

  private static url = 'https://qapp-firebase.firebaseio.com';

  public static connect(): void {
    admin.initializeApp({
      credential: admin.credential.cert(<any>account),
      databaseURL: Firebase.url
    });
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
