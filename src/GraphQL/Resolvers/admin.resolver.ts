import * as passwordGenerator from 'randomstring';

import { isAdmin } from '../../Modules/authentication';
import { Postman } from '../../Modules/postman';
import { Student } from '../../Models/student.model';
import { Teacher } from '../../Models/teacher.model';

export = {
  addStudent: async (args: any, req: any): Promise<boolean> => {
    isAdmin(req);
    args.student.password = passwordGenerator.generate(6);
    Postman.accountMail(args.student.email, 'Student', args.student.password);
    return Student.add(args.student);
  },
  addTeacher: async (args: any, req: any): Promise<boolean> => {
    isAdmin(req);
    args.teacher.password = passwordGenerator.generate(6);
    Postman.accountMail(args.teacher.email, 'Teacher', args.teacher.password);
    return Teacher.add(args.teacher);
  }
};
