import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from '../App/router';
import { Power, IToken } from '../Models/misc.model';

const APP_SECRET = 'iuwbviudqvtiuvtwd';

function authenticate(req: any, res: Response, next: NextFunction) {
  const authHeader = <string>req.get('Authorization');
  if (!authHeader) {
    req.isStudent = false;
    req.isTeacher = false;
    req.isAdmin = false;
    next();
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    req.isStudent = false;
    req.isTeacher = false;
    req.isAdmin = false;
    next();
  }
  const decodedToken = <IToken>jwt.verify(token, APP_SECRET);
  if (!decodedToken) {
    req.isStudent = false;
    req.isTeacher = false;
    req.isAdmin = false;
    next();
  }
  switch (decodedToken.power) {
    case Power.STUDENT: {
      req.isStudent = true;
      req.isTeacher = false;
      req.isAdmin = false;
      next();
    }
    case Power.TEACHER: {
      req.isStudent = false;
      req.isTeacher = true;
      req.isAdmin = false;
      next();
    }
    case Power.ADMIN: {
      req.isStudent = false;
      req.isTeacher = true;
      req.isAdmin = true;
      next();
    }
  }
}

function isStudent(req: any): void {
  if (!req.isStudent) {
    throw new Error('Not Enough Power');
  }
}

function isTeacher(req: any): void {
  if (!req.isTeacher) {
    throw new Error('Not Enough Power');
  }
}

function isAdmin(req: any): void {
  if (!req.isAdmin) {
    throw new Error('Not Enough Power');
  }
}

export {
  APP_SECRET,
  authenticate,
  isStudent,
  isTeacher,
  isAdmin
};
