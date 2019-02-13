import { Mongo, Schema, model } from '../Modules/mongo';
import { IStatus } from './misc.model';
import { Log } from '../Modules/logger';

interface IResult {
  score: string;
  name: string;
  studentID: Schema.Types.ObjectId;
  quizID: Schema.Types.ObjectId;
  _id?: Schema.Types.ObjectId;
}

interface IResultFlat {
  score: string;
  name: string;
  _id?: Schema.Types.ObjectId;
}

interface IResultInput {
  score: string;
  name: string;
  quizID: string;
  studentID: string;
}

interface IResultResponse {
  result?: IResultFlat;
  status: IStatus;
}

interface IResultsResponse {
  result?: IResultFlat[];
  status: IStatus;
}

class Result {

  /**
   * Result Schema
   * @property {String} score Correct Ans / Set Questions
   */
  private static schema = new Schema({
    score: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    studentID: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    quizID: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    }
  });

  private static DBmodel = model('Result', Result.schema);

  public static async addResult(result: IResultInput): Promise<IResult> {
    try {
      return await Mongo.add(this.DBmodel, result);
    } catch (error) {
      throw error;
    }
  }

}

export {
  Result,
  IResult,
  IResultFlat,
  IResultInput,
  IResultResponse,
  IResultsResponse
};
