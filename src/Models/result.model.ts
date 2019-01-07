import { Mongo, Schema, model } from '../Modules/mongo';

interface IResult {
  score: string;
  _id?: Schema.Types.ObjectId;
  id?: string;
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
    }
  });

  private static DBmodel = model('Result', Result.schema);

}

export {
  Result,
  IResult,
  IResultInput
};
