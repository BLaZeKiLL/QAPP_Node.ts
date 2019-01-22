import { IStatus } from '../Models/misc.model';
import { Log } from './logger';

function Handle(error: Error): IStatus {
  const log = Log.main.error;
  switch (error.message) {
    case 'AUTH': {
      log('INVALID AUTH');
      return {
        message: 'Invalid Auth',
        code: 1
      };
    }
    case 'MONGODB': {
      log('DATABASE ERROR');
      return {
        message: 'Database Error',
        code: 5
      };
    }
    case 'JSON SERIALIZATION': {
      log('JSON SERIALIZATION ERROR');
      return {
        message: 'JSON Serialization error',
        code: 6
      };
    }
    default: {
      log('ERROR' + error.stack);
      return {
        message: 'Error',
        code: 99
      };
    }
  }
}

export {
  Handle
};
