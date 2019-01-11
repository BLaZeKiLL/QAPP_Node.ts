import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Log } from '../../Modules/logger';
import { ITeacherAuthData, IToken, Power } from '../../Models/misc.model';
import { Teacher } from '../../Models/teacher.model';
import { APP_SECRET } from '../../Modules/authentication';
import { Handle } from '../../Modules/errorHandler';

export = {
  teacherLogin: async (args: any): Promise<ITeacherAuthData> => {
    Log.main.info(`Email: ${args.email} Password: ${args.password}`);
    try {
      const teacher = await Teacher.getOne({ email: args.email });
      if (!teacher) {
        throw new Error('AUTH');
      }
      const valid = await bcrypt.compare(args.password, teacher.password);
      if (!valid) {
        throw new Error('AUTH');
      }
      Log.main.info('AUTH OK');
      return {
        id: teacher._id,
        email: teacher.email,
        admin: teacher.admin,
        token: jwt.sign(<IToken>{
            id: teacher._id,
            email: teacher.email,
            power: teacher.admin ? Power.ADMIN : Power.TEACHER
          }, APP_SECRET, {
            expiresIn: '365 days'
          }),
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
