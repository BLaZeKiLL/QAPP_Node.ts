import { Mongo, Schema, model } from '../Modules/mongo';
import { IQuestionIMGInput, IQuestionIMG } from './question.model';
import { IResult } from './result.model';
import { IStatus } from './misc.model';
import { Scheduler } from '../Modules/scheduler';
import { Log } from '../Modules/logger';
import { Dispatcher } from '../Modules/dispatcher';
import { Teacher } from './teacher.model';
import { Model, Document } from 'mongoose';

interface IQuizInput {
  subject: string;
  No: number;
  totalQuestions: number;
  setQuestions: number;
  date: Date;
  duration: number;
  targetEmails: string[];
  questions: IQuestionIMGInput[];
  _id?: Schema.Types.ObjectId;
  results?: Schema.Types.ObjectId[];
}

interface IQuizFilter {
  subject?: string;
  No?: number;
  totalQuestions?: number;
  setQuestions?: number;
  date?: Date;
  duration?: number;
  targetEmails?: string[];
  questions?: IQuestionIMG[];
  _id?: Schema.Types.ObjectId;
  results?: IResult[];
}

interface IQuiz {
  subject: string;
  No: number;
  totalQuestions: number;
  setQuestions: number;
  date: Date;
  duration: number;
  targetEmails: string[];
  questions: IQuestionIMG[];
  _id: Schema.Types.ObjectId;
  results?: IResult[];
}

interface IQuizSumary {
  _id: Schema.Types.ObjectId;
  subject: string;
  No: number;
  totalQuestions: number;
  setQuestions: number;
  date: Date;
  duration: number;
}

interface IQuizResponse {
  _id?: string;
  JSON?: string;
  status: IStatus;
}

interface IQuizSumaryResponse {
  summary?: IQuizSumary[];
  status: IStatus;
}

class Quiz {

  /**
   * Quiz schema
   * @property {String} subject Subject/Topic/Name of the quiz
   * @property {Number} No Quiz number
   * @property {Number} totalQuestions Total number of questions in the quiz
   * @property {Number} setQuestions number of questions in each set of the quiz
   * @property {String} date scheduled date of the quiz
   * @property {String} time scheduled time of the quiz
   * @property {Number} duration time duaration of the quiz
   * @property {string[]} targetEmails array of targets of the quiz
   * @property {question[]} questions questions for the quiz with image URL's if any
   * @property {ref} result reference to quiz result
   */
  private static schema = new Schema({
    subject: {
      type: String,
      required: true
    },
    No: {
      type: Number,
      required: true
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    setQuestions: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    targetEmails: [{
      type: String,
      required: true
    }],
    questions: [{
      _id: false,
      question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
      },
      imageURL: String,
    }],
    results: [{
      type: Schema.Types.ObjectId,
      ref: 'Result'
    }]
  });

  private static DBmodel = model('Quiz', Quiz.schema);

  public static get Model(): Model<Document> {
    return this.DBmodel;
  }

  /**
   * Adds a quiz to DB
   * should publish to subscribtion
   * remove firebase logic
   * remove cron job
   * @static
   * @param {IQuizInput} quiz
   * @returns {Promise<boolean>}
   * @memberof Quiz
   */
  public static async add(quiz: IQuizInput, tid: Schema.Types.ObjectId): Promise<boolean> {
    try {
      const doc = await Mongo.add<IQuiz>(Quiz.DBmodel, quiz);

      if (doc) {
        const id = doc._id;
        const emails = doc.targetEmails;

        Scheduler.process(emails);
        Dispatcher.cache(id);
        Teacher.addQuiz({quizies: id}, tid);

        Log.main.info(`QUIZ ${id} ADDED TO DB`);
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  public static async getOne(filter?: IQuizFilter, id?: Schema.Types.ObjectId, populate: boolean = false): Promise<IQuiz> {
    try {
      return await Mongo.getOneQuiz(Quiz.DBmodel, filter, id);
    } catch (error) {
      Log.main.error('POPULATION ERROR');
      throw error;
    }
  }

  public static async addResult(update: any, id: Schema.Types.ObjectId): Promise<boolean> {
    try {
      await Mongo.addToArray(this.DBmodel, update, id);
      return true;
    } catch (error) {
      throw error;
    }
  }

}

export {
  IQuizInput,
  IQuizFilter,
  IQuizResponse,
  IQuizSumary,
  IQuizSumaryResponse,
  IQuiz,
  Quiz
};
