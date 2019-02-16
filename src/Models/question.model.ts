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
  type?: QuestionType;
  statement?: string;
  options?: IOption[];
  _id?: Schema.Types.ObjectId;
}

interface IQuestionUpdate {
  _id: Schema.Types.ObjectId;
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
  })
  .index({ statement: 'text'})
  .index({ type: 1, statement: 1 }, { unique: true })
  .plugin(unique);

  /**
   * Mongoose Model
   */
  private static DBmodel = model('Question', Question.schema);

  public static async add(question: IQuestion): Promise<IQuestion> {
    try {
      return await Mongo.add(Question.DBmodel, question);
    } catch (error) {
      throw error;
    }
  }

  public static async addMany(questions: IQuestion[]): Promise<IQuestion[]> {
    try {
      return await Mongo.addMany(Question.DBmodel, questions);
    } catch (error) {
      throw error;
    }
  }

  public static async get(searchQuery?: string): Promise<IQuestion[]> {
    try {
      return await <any>this.DBmodel.find({$text: {$search: searchQuery}})
      // .skip(20) // pagination controls
      // .limit(10)
      .exec();
    } catch (error) {
      throw error;
    }
  }

  public static async getOne(filter?: IQuestionFilter, id?: Schema.Types.ObjectId): Promise<IQuestion> {
    try {
      return await Mongo.getOne(Question.DBmodel, filter, id);
    } catch (error) {
      throw error;
    }
  }

  public static async update(update?: any, id?: Schema.Types.ObjectId): Promise<IQuestion> {
    try {
      return await Mongo.update<IQuestion>(Question.DBmodel, update, id);
    } catch (error) {
      throw error;
    }
  }

  public static async delete(id: Schema.Types.ObjectId): Promise<boolean> {
    try {
      return await Mongo.delete(Question.DBmodel, id);
    } catch (error) {
      throw error;
    }
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
