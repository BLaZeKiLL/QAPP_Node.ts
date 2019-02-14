import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IToken, Power } from '../../Models/misc.model';
import { Student, IStudentAuthResponse } from '../../Models/student.model';
import { APP_SECRET, isStudent } from '../../Modules/authentication';
import { Handle } from '../../Modules/errorHandler';
import { Log } from '../../Modules/logger';

const Query = {
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
      return {
        auth: {
          id: student._id,
          name: student.name,
          email: student.email,
          token: jwt.sign(<IToken>{
              id: student._id,
              email: student.email,
              power: Power.STUDENT
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
  }
};

const Mutation = {
  updateStudent: async (args: any, req: any): Promise<boolean> => {
    try {
      isStudent(req);
      const student: any = {};
      if (args.student.name !== undefined) student.name = args.student.name;
      if (args.student.email !== undefined) student.email = args.student.email;
      if (args.student.password !== undefined) student.password = args.student.password;
      return await Student.update(
        student,
        args.student._id
      );
    } catch (error) {
      Log.main.error('ACCOUNT UPDATE ERROR');
      return false;
    }
  }
};

export {
  Query,
  Mutation
};
