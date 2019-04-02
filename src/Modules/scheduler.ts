import * as passwordGenerator from 'randomstring';
import { Log } from './logger';
import { Firebase } from './firebase';
import { Student } from '../Models/student.model';
import { Postman } from './postman';
import { Teacher } from 'Models/teacher.model';

class Scheduler {

  public static async process(emails: string[]): Promise<void> {
    try {
      const stu_accounts = await Student.Model.find({
        'email': {
          $in: emails
        }
      });
      const deviceIDs = <string[]>stu_accounts.map(student => (<any>student).deviceID);
      console.log(deviceIDs.filter(deviceID => deviceID !== undefined));
      Firebase.reminder_id(deviceIDs.filter(deviceID => deviceID !== undefined));
      const stu_emails = <string[]>stu_accounts.map(student => (<any>student).email);
      Log.main.info(`OLD ACCOUNTS: ${JSON.stringify(stu_emails)}`);

      const new_emails = emails.filter(x => stu_emails.indexOf(x) === -1);
      Log.main.info(`NEW ACCOUNTS: ${JSON.stringify(new_emails)}`);
      new_emails.forEach(email => {
        const password = passwordGenerator.generate(6);
        Log.main.info(`EMAIL: ${email} PASSWORD: ${password}`);
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
