import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Log } from '../../Modules/logger';
import { ITeacherAuthData, IToken, Power } from '../../Models/misc.model';
import { Teacher } from '../../Models/teacher.model';
import { APP_SECRET } from '../../Modules/authentication';

export = {
  teacherLogin: async (args: any): Promise<ITeacherAuthData> => {
    Log.main.info(`Email: ${args.email} Password: ${args.password}`);
    try {
      const teacher = await Teacher.getOne({ email: args.email });
      if (!teacher) {
        Log.main.info('ERROR');
        throw new Error('User not found');
      }
      const valid = await bcrypt.compare(args.password, teacher.password);
      if (!valid) {
        Log.main.info('ERROR');
        throw new Error('Invalid credentials');
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
        })
      };
    } catch (error) {
      Log.main.info('ERROR');
      throw error;
    }
  },
};
