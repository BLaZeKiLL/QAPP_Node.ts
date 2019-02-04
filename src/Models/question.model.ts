import { Mongo, Schema, model } from '../Modules/mongo';
import unique from 'mongoose-unique-validator';
import { IStatus } from './misc.model';
import { Log } from '../Modules/logger';

/**
 * Types of questions
 */
enum QuestionType {
  MCQ_SINGLE = 'MCQ_SINGLE',
  MCQ_MULTIPLE = 'MCQ_MULTIPLE',
}

/**
 * Represents an Option
 */
interface IOption {
  statement: string;
  isAns: boolean;
}

/**
 * Question accourding to GraphQL
 */
interface IQuestion {
  courseCode: string;
  type: QuestionType;
  statement: string;
  options: IOption[];
  _id?: Schema.Types.ObjectId;
}

interface IQuestionIMGInput {
  question: Schema.Types.ObjectId;
  imageURL: string;
}

interface IQuestionIMG {
  question: IQuestion;
  imageURL: string;
}

/**
 * MongoDB Question filter
 */
interface IQuestionFilter {
  courseCode?: string;
  type?: QuestionType;
  statement?: string;
  options?: IOption[];
  _id?: Schema.Types.ObjectId;
}

interface IQuestionUpdate {
  _id: Schema.Types.ObjectId;
  courseCode?: string;
  type?: QuestionType;
  statement?: string;
  options?: IOption[];
}

interface IQuestionResponse {
  question?: IQuestion;
  status: IStatus;
}

interface IQuestionsResponse {
  questions?: IQuestion[];
  status: IStatus;
}

/**
 * Question Mongo Wrapper
 */
class Question {

  /**
   * Question schema
   * @property {String} courseCode Course-Code of the question
   * @property {String} type Question type
   * @property {String} statement Question statement
   * @property {option[]} options Array of options of the question
   */
  private static schema = new Schema({
    courseCode: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['MCQ_SINGLE', 'MCQ_MULTIPLE'],
      required: true
    },
    statement: {
      type: String,
      required: true
    },
    options: [{
      _id: false,
      statement: {
        type: String,
        required: true
      },
      isAns: {
        type: Boolean,
        required: true
      }
    }],
  }).index({ courseCode: 1, type: 1, statement: 1 }, { unique: true }).plugin(unique);

  /**
   * Mongoose Model
   */
  private static DBmodel = model('Question', Question.schema);

  public static async add(question: IQuestion): Promise<IQuestion> {
    return Mongo.add(Question.DBmodel, question);
  }

  public static async addMany(questions: IQuestion[]): Promise<IQuestion[]> {
    return Mongo.addMany(Question.DBmodel, questions);
  }

  public static async get(filter?: IQuestionFilter): Promise<IQuestion[]> {
    return Mongo.get(Question.DBmodel, filter);
  }

  public static async getOne(filter?: IQuestionFilter, id?: Schema.Types.ObjectId): Promise<IQuestion> {
    return Mongo.getOne(Question.DBmodel, filter, id);
  }

  public static async update(filter?: any, id?: Schema.Types.ObjectId): Promise<IQuestion> {
    try {
      Log.main.info(JSON.stringify(filter));
      return await Mongo.update<IQuestion>(Question.DBmodel, filter, id);
    } catch (error) {
      throw error;
    }
  }

  public static async delete(id: Schema.Types.ObjectId): Promise<boolean> {
    return Mongo.delete(Question.DBmodel, id);
  }

}

export {
  QuestionType,
  IQuestion,
  IQuestionResponse,
  IQuestionsResponse,
  IQuestionFilter,
  IQuestionIMG,
  IQuestionUpdate,
  IQuestionIMGInput,
  IOption,
  Question,
};
