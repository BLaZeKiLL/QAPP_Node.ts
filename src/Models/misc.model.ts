import { Schema } from '../Modules/mongo';

interface ITarget {
  branch: string;
  semester: number;
  section: string;
}

enum Power {
  STUDENT,
  TEACHER,
  ADMIN
}

interface IToken {
  id: Schema.Types.ObjectId;
  email: string;
  power?: Power;
}

interface IStudentAuthData {
  id: Schema.Types.ObjectId;
  email: string;
  token: string;
}

interface ITeacherAuthData {
  id: Schema.Types.ObjectId;
  email: string;
  admin: boolean;
  token: string;
}

export {
  ITarget,
  Power,
  IToken,
  IStudentAuthData,
  ITeacherAuthData
};
