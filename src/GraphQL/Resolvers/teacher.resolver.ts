import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IAuthData, IToken, Power } from '../../Models/misc.model';
import { Teacher } from '../../Models/teacher.model';
import { APP_SECRET } from '../../Modules/authentication';

export = {
  teacherLogin: async (args: any): Promise<IAuthData> => {
    try {
      const teacher = await Teacher.getOne({ email: args.email });
      if (!teacher) {
        throw new Error('User not found');
      }
      const valid = await bcrypt.compare(args.password, teacher.password);
      if (!valid) {
        throw new Error('Invalid credentials');
      }
      return {
        id: teacher._id,
        email: teacher.email,
        token: jwt.sign(<IToken>{
          id: teacher._id,
          email: teacher.email,
          power: teacher.admin ? Power.ADMIN : Power.TEACHER
        }, APP_SECRET, {
          expiresIn: '365 days'
        })
      };
    } catch (error) {
      throw error;
    }
  },
};
