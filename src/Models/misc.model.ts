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

interface IStatus {
  message: string;
  code: number;
}

interface IToken {
  id: Schema.Types.ObjectId;
  email: string;
  power?: Power;
}

interface IStudentAuthData {
  id?: Schema.Types.ObjectId;
  email?: string;
  token?: string;
  status: IStatus;
}

interface ITeacherAuthData {
  id?: Schema.Types.ObjectId;
  email?: string;
  admin?: boolean;
  token?: string;
  status: IStatus;
}

export {
  ITarget,
  Power,
  IToken,
  IStatus,
  IStudentAuthData,
  ITeacherAuthData
};
