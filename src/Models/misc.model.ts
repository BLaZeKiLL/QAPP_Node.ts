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

interface IAuthData {
  id: Schema.Types.ObjectId;
  email: string;
  token: string;
}

export {
  ITarget,
  Power,
  IToken,
  IAuthData
};
