import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { Power, IToken } from '../Models/misc.model';
import { Log } from './logger';

const APP_SECRET = 'iuwbviudqvtiuvtwd';

function authenticate(req: any, res: Response, next: NextFunction) {
  const token = req.get('Authorization');
  if (token == undefined) {
    Log.main.info('NO TOKEN');
    req.isStudent = false;
    req.isTeacher = false;
    req.isAdmin = false;
    next();
    return;
  }
  if (!token) {
    Log.main.info('NO TOKEN');
    req.isStudent = false;
    req.isTeacher = false;
    req.isAdmin = false;
    next();
    return;
  }
  const decodedToken = <IToken>jwt.verify(token, APP_SECRET);
  if (!decodedToken) {
    Log.main.info('INVALID TOKEN');
    req.isStudent = false;
    req.isTeacher = false;
    req.isAdmin = false;
    next();
    return;
  }
  Log.main.info(`DECODED TOKEN ${JSON.stringify(decodedToken)}`);
  switch (decodedToken.power) {
    case Power.STUDENT: {
      req.isStudent = true;
      req.isTeacher = false;
      req.isAdmin = false;
      Log.main.info('STUDENT REQUEST');
      next();
      return;
    }
    case Power.TEACHER: {
      req.isStudent = false;
      req.isTeacher = true;
      req.isAdmin = false;
      Log.main.info('TEACHER REQUEST');
      next();
      return;
    }
    case Power.ADMIN: {
      req.isStudent = false;
      req.isTeacher = true;
      req.isAdmin = true;
      Log.main.info('ADMIN REQUEST');
      next();
      return;
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
