import * as bcrypt from 'bcryptjs';

import { Mongo, Schema, model } from '../Modules/mongo';

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
  _id?: Schema.Types.ObjectId;
}

interface ITeacherInput {
  name: string;
  email: string;
  admin: boolean;
  password: string;
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

  public static async add(student: ITeacherInput): Promise<boolean> {
    try {
      student.password = await bcrypt.hash(student.password, 12);
      await Mongo.add(this.DBmodel, student);
      return true;
    } catch (error) {
      throw error;
    }
  }

  public static async getOne(filter?: ITeacherFilter, id?: Schema.Types.ObjectId): Promise<ITeacher> {
    return Mongo.getOne(Teacher.DBmodel, filter, id);
  }
}

export {
  Teacher,
  ITeacher,
  ITeacherFilter,
  ITeacherInput
};
