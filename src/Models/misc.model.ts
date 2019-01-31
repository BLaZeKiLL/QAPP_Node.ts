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
  id: string;
  email: string;
  power?: Power;
}

export {
  Power,
  IToken,
  IStatus,
};
