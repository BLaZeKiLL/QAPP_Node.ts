import { Schema } from '../Modules/mongo';

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
  Power,
  IToken,
  IStatus,
};
