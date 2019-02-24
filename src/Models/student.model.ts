import * as bcrypt from 'bcryptjs';

import { Mongo, Schema, model } from '../Modules/mongo';
import { IStatus } from './misc.model';
import { IResult } from './result.model';

interface IStudent {
  _id?: Schema.Types.ObjectId;
  name: string;
  email: string;
  deviceID?: string;
  password?: string;
  resluts?: IResult[];
}

interface IStudentFilter {
  _id?: Schema.Types.ObjectId;
  name?: string;
  email?: string;
  deviceID?: string;
  password?: boolean;
  resluts?: IResult[];
}

interface IStudentInput {
  name: string;
  email: string;
  password: string;
}

interface IStudentAuthResponse {
  auth?: {
    id: Schema.Types.ObjectId;
    name: string;
    email: string;
    token: string;
  };
  status: IStatus;
}

class Student {

  /**
   * Student profile schema
   * @property {String} name name of teacher
   * @property {String} username username credential
   * @property {String} password password credential stored as HASH
   * @property {String} deviceID Firebase device ID
   * @property {ref[]} result references to results of the student
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
    deviceID: String,
    password: {
      type: String,
      required: true
    },
    results: [{
      type: Schema.Types.ObjectId,
      ref: 'Result'
    }]
  });

  private static DBmodel = model('Student', Student.schema);

  public static async add(student: IStudentInput): Promise<boolean> {
    try {
      student.password = await bcrypt.hash(student.password, 12);
      await Mongo.add(this.DBmodel, student);
      return true;
    } catch (error) {
      throw error;
    }
  }

  public static async getOne(filter?: IStudentFilter, id?: Schema.Types.ObjectId): Promise<IStudent> {
    try {
      return await Mongo.getOne(Student.DBmodel, filter, id);
    } catch (error) {
      throw error;
    }
  }

  public static async update(update: any, id: Schema.Types.ObjectId): Promise<boolean> {
    try {
      if (update.password !== undefined) update.password = await bcrypt.hash(update.password, 12);
      await Mongo.update<IStudent>(Student.DBmodel, update, id);
      return true;
    } catch (error) {
      throw error;
    }
  }

  public static async addResult(update: any, id: Schema.Types.ObjectId): Promise<boolean> {
    try {
      await Mongo.addToArray<IStudent>(this.DBmodel, update, id);
      return true;
    } catch (error) {
      throw error;
    }
  }

}

export {
  Student,
  IStudent,
  IStudentFilter,
  IStudentInput,
  IStudentAuthResponse
};
