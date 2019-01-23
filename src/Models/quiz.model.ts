import { Mongo, Schema, model } from '../Modules/mongo';
import { IQuestionIMGInput, IQuestionIMG } from './question.model';
import { IResult } from './result.model';
import { IStatus } from './misc.model';
import { Firebase } from '../Modules/firebase';
import { Scheduler } from '../Modules/scheduler';
import { Log } from '../Modules/logger';

interface IQuizInput {
  courseCode: string;
  No: number;
  creator: Schema.Types.ObjectId;
  totalQuestions: number;
  setQuestions: number;
  date: Date;
  duration: number;
  targets: string[];
  questions: IQuestionIMGInput[];
  _id?: Schema.Types.ObjectId;
  results?: Schema.Types.ObjectId[];
}

interface IQuizFilter {
  courseCode?: string;
  No?: number;
  creator?: Schema.Types.ObjectId;
  totalQuestions?: number;
  setQuestions?: number;
  date?: Date;
  duration?: number;
  targets?: string[];
  questions?: IQuestionIMG[];
  _id?: Schema.Types.ObjectId;
  results?: IResult[];
}

interface IQuiz {
  courseCode: string;
  No: number;
  creator: Schema.Types.ObjectId;
  totalQuestions: number;
  setQuestions: number;
  date: Date;
  duration: number;
  targets: string[];
  questions: IQuestionIMG[];
  _id: Schema.Types.ObjectId;
  id: string;
  results?: IResult[];
}

interface IQuizResponse {
  quiz?: IQuiz;
  status: IStatus;
}

class Quiz {

  /**
   * Quiz schema
   * @property {String} courseCode Course-Code of the quiz
   * @property {Number} No Quiz number
   * @property {ref} creator refrence to the teacher account which created the quiz
   * @property {Number} totalQuestions Total number of questions in the quiz
   * @property {Number} setQuestions number of questions in each set of the quiz
   * @property {String} date scheduled date of the quiz
   * @property {String} time scheduled time of the quiz
   * @property {Number} duration time duaration of the quiz
   * @property {string[]} targets array of targets of the quiz
   * @property {question[]} questions questions for the quiz with image URL's if any
   * @property {ref} result reference to quiz result
   */
  private static schema = new Schema({
    courseCode: {
      type: String,
      required: true
    },
    No: {
      type: Number,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
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
    targets: [{
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

  public static async add(quiz: IQuizInput): Promise<boolean> {
    const doc = await Mongo.add(Quiz.DBmodel, quiz);
    if (doc) {
      const id = doc._id;
      const date = doc.date;
      Firebase.quizCardBroadcast(<any>doc);
      Scheduler.schedule(id, date);
      Log.main.info(`QUIZ ${id} ADDED TO DB`);
      return true;
    }
  }

  public static async getOne(filter?: IQuizFilter, id?: Schema.Types.ObjectId): Promise<IQuiz> {
    return Mongo.getOne(Quiz.DBmodel, filter, id);
  }

}

export {
  IQuizInput,
  IQuizFilter,
  IQuizResponse,
  IQuiz,
  Quiz
};
