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

export {
  ITarget,
  Power,
  IToken,
  IStatus,
};
