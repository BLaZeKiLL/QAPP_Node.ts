import * as bcrypt from 'bcryptjs';

import { Mongo, Schema, model } from '../Modules/mongo';
import { ITarget, IStatus } from './misc.model';
import { IResult } from './result.model';

interface IStudent {
  _id?: Schema.Types.ObjectId;
  id?: string;
  name: string;
  email: string;
  password?: string;
  deviceID?: string;
  rollno: string;
  target: ITarget;
  resluts?: IResult[];
}

interface IStudentFilter {
  _id?: Schema.Types.ObjectId;
  name?: string;
  email?: string;
  deviceID?: string;
  rollno?: string;
  target?: ITarget;
  resluts?: IResult[];
}

interface IStudentInput {
  name: string;
  email: string;
  password: string;
  rollno: string;
  target: ITarget;
}

interface IStudentAuthData {
  id?: Schema.Types.ObjectId;
  email?: string;
  token?: string;
  status: IStatus;
}

class Student {

  /**
   * Student profile schema
   * @property {String} name name of teacher
   * @property {String} username username credential
   * @property {String} password password credential stored as HASH
   * @property {String} deviceID Firebase device ID
   * @property {Number} rollNo University Roll number
   * @property {target} target brancg/sem/section of the student
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
    password: {
      type: String,
      required: true
    },
    deviceID: String,
    rollno: {
      type: String,
      required: true
    },
    target: {
      _id: false,
      branch: {
        type: String,
        required: true
      },
      semester: {
        type: Number,
        required: true
      },
      section: {
        type: String,
        required: true
      }
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
    return Mongo.getOne(Student.DBmodel, filter, id);
  }

  public static async update(filter: IStudentFilter, id: Schema.Types.ObjectId): Promise<boolean> {
    return Mongo.update(Student.DBmodel, filter, id);
  }

}

export {
  Student,
  IStudent,
  IStudentFilter,
  IStudentInput,
  IStudentAuthData
};
