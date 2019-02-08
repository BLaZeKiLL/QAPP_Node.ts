import * as passwordGenerator from 'randomstring';

import { isAdmin } from '../../Modules/authentication';
import { Postman } from '../../Modules/postman';
import { Student } from '../../Models/student.model';
import { Teacher } from '../../Models/teacher.model';
import { Log } from '../../Modules/logger';

const Query = {

};

const Mutation = {
  addStudent: async (obj: any, args: any, req: any): Promise<boolean> => {
    isAdmin(req);
    args.student.password = passwordGenerator.generate(6);
    Postman.accountMail(args.student.email, 'Student', args.student.password);
    Log.main.info(`NEW STUDENT: ${JSON.stringify(args.student)}`);
    return Student.add(args.student);
  },
  addTeacher: async (obj: any, args: any, req: any): Promise<boolean> => {
    isAdmin(req);
    args.teacher.password = passwordGenerator.generate(6);
    Postman.accountMail(args.teacher.email, 'Teacher', args.teacher.password);
    Log.main.info(`NEW TEACHER: ${JSON.stringify(args.teacher)}`);
    return Teacher.add(args.teacher);
  }
};

export {
  Query,
  Mutation
};
