import { Mongo, Schema, model } from '../Modules/mongo';
import { IStatus } from './misc.model';

interface IResult {
  score: string;
  studentID: Schema.Types.ObjectId;
  quizID: Schema.Types.ObjectId;
  _id?: Schema.Types.ObjectId;
}

interface IQuizResult {
  score: string;
  email: string;
  _id?: Schema.Types.ObjectId;
}

interface IResultInput {
  score: string;
  quizID: string;
  studentID: string;
}

interface IAddResultResponse {
  result?: IResult;
  status: IStatus;
}

interface IQuizResultsResponse {
  result?: IQuizResult[];
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

  public static DBmodel = model('Result', Result.schema);

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
  IQuizResult,
  IResultInput,
  IAddResultResponse,
  IQuizResultsResponse
};
