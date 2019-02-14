import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ip from 'ip';
import morgan from 'morgan';

import { GraphBuilder } from '../GraphQL/graphql';
import { Mongo } from '../Modules/mongo';
import { Log } from '../Modules/logger';
import { Teacher } from '../Models/teacher.model';
import { Student } from '../Models/student.model';
import { authenticate } from '../Modules/authentication';
import { Question, QuestionType } from '../Models/question.model';

/**
 * The Node-Express Application that will run on the server
 *
 * @export
 * @class App
 */
export class App {

  /**
   * Express App
   *
   * @private
   * @type {Express}
   * @memberof App
   */
  private app: Express;

  /**
   * Creates the App and calls all the setups()
   * @param MONGODB_NAME Database name to be used
   * @memberof App
   */
  constructor(
    private MONGODB_NAME: string
  ) {
    this.app = express();
    process.env.TZ = 'Asia/Kolkata';
    this.setupLoggers();
    this.setupMongoDB();
    this.setupBodyParser();
    this.setupGrapQL();
    try {
      // this.ini(); // Uncomment this to add deafult admin account
      // this.iniQuestions(); // Uncomment this to seed question bank
    } catch (error) {
      Log.main.error(error);
    }
  }

  /**
   * Express app.listen() wrapper
   * @param {() => any} callback called whern server is started
   * @memberof App
   */
  public listen(callback: () => any): void {
    this.app.listen(process.env.PORT || 3000, /*ip.address(),*/ callback());
  }

  /**
   * @returns {string} local URL of the server
   * @memberof App
   */
  public getLocalUrl(): string {
    return `http://localhost:${process.env.PORT || 3000}/`;
  }

  /**
   * @returns {string} ip of the server
   * @memberof App
   */
  public getIP(): string {
    return `http://${ip.address()}:${process.env.PORT || 3000}/`;
  }

  /**
   * MongoDB setup
   *
   * @private
   * @memberof App
   */
  private setupMongoDB() {
    Mongo.connectDB(this.getMongoDBUrl());
  }

  /**
   * Body Parser setup
   *
   * @private
   * @memberof App
   */
  private setupBodyParser(): void {
    this.app.use(cors()); // remove in production
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.text());
    this.app.use(bodyParser.json({ type: 'application/json'}));
  }

  /**
   * GraphQL strup
   *
   * @private
   * @memberof App
   */
  private setupGrapQL(): void {
    this.app.use('/graphql', (req, res, next) => {
      Log.main.verbose(JSON.stringify(req.body));
      next();
    });
    this.app.use('/graphql', authenticate);
    this.app.use('/graphql', new GraphBuilder(true).getMiddleWare());
  }

  /**
   * Logger Setup
   *
   * @private
   * @memberof App
   */
  private setupLoggers(): void {
    Log.initialize();
    this.app.use(morgan('combined', { stream: { write: (message: string) => Log.request.info(message.trim()) } }));
  }

  /**
   * Creates the mongodb url depending upon the config
   *
   * @private
   * @returns {string} MongoDB url
   * @memberof App
   */
  private getMongoDBUrl(): string {
    if (process.env.NODE_ENV === 'test') {
      Log.main.info('CONNNECTING TO LOCAL TEST DB');
      return `mongodb://localhost:27017/${this.MONGODB_NAME + '_TEST'}`;
    } else if (process.env.NODE_ENV === 'local') {
      Log.main.info('CONNECTING TO LOCAL DB');
      return `mongodb://localhost:27017/${this.MONGODB_NAME}`;
    } else {
      Log.main.info('CONNECTING TO CLUSTER');
      return `mongodb+srv://QAPP_DEV:qappdev@devcluster-3kbft.mongodb.net/${this.MONGODB_NAME}?retryWrites=true`;
    }
  }

  /**
   * Account seeder
   *
   * @private
   * @returns {Promise<void>}
   * @memberof App
   */
  private async ini(): Promise<void> {
    await Teacher.add({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin'
    });

    await Student.add({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin',
    });
    Log.main.info('ACCOUNTS SEEDED');
  }

  /**
   * Question seeder
   *
   * @private
   * @returns {Promise<void>}
   * @memberof App
   */
  private async iniQuestions(): Promise<void> {
    await Question.addMany([
      {
        tags: ['DAA', 'Algorithims'],
        statement: 'What is the essentials of dynamic programing ?',
        type: QuestionType.MCQ_MULTIPLE,
        options: [
          {
            statement: 'Dividing',
            isAns: false
          },
          {
            statement: 'Memoization',
            isAns: true
          },
          {
            statement: 'Brute Force',
            isAns: false
          },
          {
            statement: 'Bottom Up',
            isAns: true
          }
        ]
      }, {
        tags: ['DAA', 'Algorithims'],
        statement: 'In a max-heap, element with the greatest key is always in the which node ?',
        type: QuestionType.MCQ_SINGLE,
        options: [
          {
            statement: 'Leaf node',
            isAns: false
          },
          {
            statement: 'First node of left sub tree',
            isAns: false
          },
          {
            statement: 'root node',
            isAns: true
          },
          {
            statement: 'First node of right sub tree',
            isAns: false
          }
        ]
      }, {
        tags: ['DAA', 'Algorithims'],
        statement: 'Which of the follwing have N complexity ?',
        type: QuestionType.MCQ_MULTIPLE,
        options: [
          {
            statement: 'Merge Sort',
            isAns: false
          },
          {
            statement: 'Counting Sort',
            isAns: true
          },
          {
            statement: 'Radix Sort',
            isAns: true
          },
          {
            statement: 'Quick Sort',
            isAns: false
          }
        ]
      }, {
        tags: ['DAA', 'Algorithims'],
        statement: 'Which of the following problems can be solved using recursion ?',
        type: QuestionType.MCQ_SINGLE,
        options: [
          {
            statement: 'Factorial of a number',
            isAns: false
          },
          {
            statement: 'Nth fibonacci number',
            isAns: false
          },
          {
            statement: 'Length of a string',
            isAns: false
          },
          {
            statement: 'All of the mentioned',
            isAns: true
          }
        ]
      }, {
        tags: ['DAA', 'Algorithims'],
        statement: 'What are the types of complexity analysis ?',
        type: QuestionType.MCQ_MULTIPLE,
        options: [
          {
            statement: 'Space',
            isAns: true
          },
          {
            statement: 'Size',
            isAns: false
          },
          {
            statement: 'Line',
            isAns: false
          },
          {
            statement: 'Time',
            isAns: true
          }
        ]
      }
    ]);
    Log.main.info('QUESTION BANK SEEDED');
  }

}
