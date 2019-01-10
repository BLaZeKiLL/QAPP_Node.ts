import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IStudentAuthData, IToken } from '../../Models/misc.model';
import { Student } from '../../Models/student.model';
import { APP_SECRET } from '../../Modules/authentication';

export = {
  studentLogin: async (args: any): Promise<IStudentAuthData> => {
    try {
      const student = await Student.getOne({ email: args.email });
      if (!student) {
        throw new Error('User not found');
      }
      const valid = await bcrypt.compare(args.password, student.password);
      if (!valid) {
        throw new Error('Invalid credentials');
      }
      if (!student.deviceID || student.deviceID !== args.deviceID) {
        Student.update({deviceID: args.deviceID}, student._id);
      }
      return {
        id: student._id,
        email: student.email,
        token: jwt.sign(<IToken>{
          id: student._id,
          email: student.email,
        }, APP_SECRET, {
          expiresIn: '365 days'
        })
      };
    } catch (error) {
      throw error;
    }
  },
  studentResults: (args: any) => {

  }
};
