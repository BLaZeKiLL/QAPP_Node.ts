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
    next();
    return; // REMOVE
  }
  if (!token) {
    Log.main.info('NO TOKEN');
    req.isStudent = false;
    req.isTeacher = false;
    next();
    return; // REMOVE
  }
  const decodedToken = <IToken>jwt.verify(token, APP_SECRET);
  if (!decodedToken) {
    Log.main.info('INVALID TOKEN');
    req.isStudent = false;
    req.isTeacher = false;
    next();
    return; // REMOVE
  }
  Log.main.info(`DECODED TOKEN ${JSON.stringify(decodedToken)}`);
  switch (decodedToken.power) {
    case Power.STUDENT: {
      req.isStudent = true;
      req.isTeacher = false;
      Log.main.info('STUDENT REQUEST');
      next();
      return;
    }
    case Power.TEACHER: {
      req.isStudent = false;
      req.isTeacher = true;
      Log.main.info('TEACHER REQUEST');
      next();
      return;
    }
  }
}

function isStudent(req: any): void {
  if (process.env.NODE_ENV === 'test') return;
  if (!req.isStudent) {
    throw new Error('Not Enough Power');
  }
}

function isTeacher(req: any): void {
  if (process.env.NODE_ENV === 'test') return;
  if (!req.isTeacher) {
    throw new Error('Not Enough Power');
  }
}

export {
  APP_SECRET,
  authenticate,
  isStudent,
  isTeacher
};
