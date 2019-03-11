import * as bcrypt from 'bcryptjs';

import { Mongo, Schema, model } from '../Modules/mongo';
import { IStatus } from './misc.model';

interface ITeacher {
  name: string;
  email: string;
  password?: string;
  quizies?: Schema.Types.ObjectId[];
  _id?: Schema.Types.ObjectId;
}

interface ITeacherFilter {
  name?: string;
  email?: string;
  password?: boolean;
  _id?: Schema.Types.ObjectId;
}

interface ITeacherInput {
  name: string;
  email: string;
  password: string;
}

interface ITeacherAuthResponse {
  auth?: {
    id: Schema.Types.ObjectId;
    email: string;
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
    password: {
      type: String,
      required: true
    },
    quizies: [{
      type: Schema.Types.ObjectId,
      ref: 'Quiz'
    }]
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
    try {
      return await Mongo.getOne(Teacher.DBmodel, filter, id);
    } catch (error) {
      throw error;
    }
  }

  public static async addQuiz(update: any, id: Schema.Types.ObjectId): Promise<boolean> {
    try {
      await Mongo.addToArray<ITeacher>(this.DBmodel, update, id);
      return true;
    } catch (error) {
      throw error;
    }
  }

  public static async update(update: any, id: Schema.Types.ObjectId): Promise<boolean> {
    try {
      if (update.password !== undefined) update.password = await bcrypt.hash(update.password, 12);
      await Mongo.update<ITeacher>(Teacher.DBmodel, update, id);
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
