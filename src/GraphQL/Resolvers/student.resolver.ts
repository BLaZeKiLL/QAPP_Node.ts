import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IToken } from '../../Models/misc.model';
import { Student, IStudentAuthResponse } from '../../Models/student.model';
import { APP_SECRET } from '../../Modules/authentication';
import { Handle } from '../../Modules/errorHandler';
import { Log } from '../../Modules/logger';
import { Firebase } from '../../Modules/firebase';

export = {
  studentLogin: async (args: any): Promise<IStudentAuthResponse> => {
    try {
      const student = await Student.getOne({ email: args.email });
      if (!student) {
        throw new Error('AUTH');
      }
      const valid = await bcrypt.compare(args.password, student.password);
      if (!valid) {
        throw new Error('AUTH');
      }
      Log.main.info('AUTH OK');
      if (!student.deviceID || student.deviceID !== args.deviceID) {
        Student.update({deviceID: args.deviceID}, student._id);
        Firebase.subscribe(student.target, args.deviceID);
        Log.main.info('DEVICE ID UPDATED');
      }
      return {
        auth: {
          id: student._id,
          name: student.name,
          email: student.email,
          rollno: student.rollno,
          target: student.target,
          token: jwt.sign(<IToken>{
              id: student._id,
              email: student.email,
            }, APP_SECRET, {
              expiresIn: '365 days'
            }),
        },
        status: {
          message: 'OK',
          code: 0
        }
      };
    } catch (error) {
      return {
        status: Handle(error)
      };
    }
  },
  studentResults: (args: any) => {

  }
};
