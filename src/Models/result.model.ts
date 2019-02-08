import { Mongo, Schema, model } from '../Modules/mongo';

interface IResult {
  score: string;
  studentID: Schema.Types.ObjectId;
  quizID: Schema.Types.ObjectId;
  _id?: Schema.Types.ObjectId;
}

interface IResultInput {
  score: string;
  quizID: string;
  studentID: string;
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

  private static DBmodel = model('Result', Result.schema);

  public static addResult(result: IResultInput): Promise<boolean> {
    try {
      return undefined;
    } catch {

    }
  }

}

export {
  Result,
  IResult,
  IResultInput
};
