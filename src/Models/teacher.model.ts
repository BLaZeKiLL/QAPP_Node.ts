import * as bcrypt from 'bcryptjs';

import { Mongo, Schema, model } from '../Modules/mongo';
import { IStatus } from './misc.model';

interface ITeacher {
  name: string;
  email: string;
  admin: boolean;
  password?: string;
  _id?: Schema.Types.ObjectId;
  id?: string;
}

interface ITeacherFilter {
  name?: string;
  email?: string;
  admin?: boolean;
  password?: boolean;
  _id?: Schema.Types.ObjectId;
}

interface ITeacherInput {
  name: string;
  email: string;
  admin: boolean;
  password: string;
}

interface ITeacherAuthResponse {
  auth?: {
    id: Schema.Types.ObjectId;
    email: string;
    admin: boolean;
    token: string;
    name: string;
  };
  status: IStatus;
}

class Teacher {

  /**
   * Teacher profile schema
   * @property {String} name name of teacher
   * @property {String} username username credential
   * @property {String} password password credential stored as HASH
   */
  private static schema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });

  private static DBmodel = model('Teacher', Teacher.schema);

  public static async add(teacher: ITeacherInput): Promise<boolean> {
    try {
      teacher.password = await bcrypt.hash(teacher.password, 12);
      await Mongo.add(this.DBmodel, teacher);
      return true;
    } catch (error) {
      throw error;
    }
  }

  public static async getOne(filter?: ITeacherFilter, id?: Schema.Types.ObjectId): Promise<ITeacher> {
    return Mongo.getOne(Teacher.DBmodel, filter, id);
  }

  public static async update(filter: ITeacherFilter, id: Schema.Types.ObjectId): Promise<boolean> {
    try {
      await Mongo.update<ITeacher, ITeacherFilter>(Teacher.DBmodel, filter, id);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export {
  Teacher,
  ITeacher,
  ITeacherFilter,
  ITeacherInput,
  ITeacherAuthResponse
};
