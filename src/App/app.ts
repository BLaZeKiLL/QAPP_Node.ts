import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ip from 'ip';
import morgan from 'morgan';

import IndexRoutes from '../Routes/index';
import { GraphBuilder } from '../GraphQL/graphql';
import { Mongo } from '../Modules/mongo';
import { Firebase } from '../Modules/firebase';
import { Log } from '../Modules/logger';
import { Teacher } from '../Models/teacher.model';
import { Student } from '../Models/student.model';
import { authenticate } from '../Modules/authentication';
import { Question, QuestionType } from '../Models/question.model';

/**
 * The Node-Express Application that will run on the server
 */
class App {

  /**
   * Express app
   */
  private app: Express;

  /**
   * Creates the App and calls all the setups()
   * @param PORT Port on which the server is to be run
   * @param MONGODB_NAME Database name to be used
   */
  constructor(
    private PORT: number,
    private MONGODB_NAME: string
  ) {
    this.app = express();
    this.setupMongoDB();
    this.setupBodyParser();
    this.setupGrapQL();
    this.setupLoggers();
    this.setupFirebase();
    this.setupRoutes();
    // this.ini(); // Uncomment this to add deafult admin account
    // this.iniQuestions(); // Uncomment this to seed question bank
  }

  /**
   * Express app.listen() wrapper
   * @param callback called whern server is started
   */
  public listen(callback: () => any): void {
    this.app.listen(this.PORT, /*ip.address(),*/ callback());
  }

  /**
   * @returns local URL of the server
   */
  public getLocalUrl(): string {
    return `http://localhost:${this.PORT}/`;
  }

  public getIP(): string {
    return `http://${ip.address()}:3000`;
  }

  /**
   * MongoDB setup
   */
  private setupMongoDB() {
    Mongo.connectDB(this.getLocalMongoDBUrl());
  }

  /**
   * Body-Parser setup
   */
  private setupBodyParser(): void {
    this.app.use(cors()); // remove in production
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.text());
    this.app.use(bodyParser.json({ type: 'application/json'}));
  }

  private setupGrapQL(): void {
    this.app.use('/graphql', (req, res, next) => {
      Log.main.verbose(JSON.stringify(req.body));
      next();
    });
    this.app.use('/graphql', authenticate);
    this.app.use('/graphql', new GraphBuilder(true).getMiddleWare());
  }

  private setupLoggers(): void {
    this.app.use(morgan('combined', { stream: { write: (message: string) => Log.request.info(message.trim()) } }));
  }

  private setupFirebase(): void {
    Firebase.connect();
  }

  /**
   * Route setup
   */
  private setupRoutes(): void {
    this.app.use('/', IndexRoutes);
  }

  /**
   * Returns the MongoDb url according to the envoirment
   * @returns MongoDB url
   */
  private getLocalMongoDBUrl(): string {
    if (process.env.NODE_ENV === 'test') {
      return `mongodb://localhost:27017/${this.MONGODB_NAME + '_TEST'}`;
    } else {
      return `mongodb://localhost:27017/${this.MONGODB_NAME}`;
    }
  }

  private async ini(): Promise<void> {
    await Teacher.add({
      name: 'Admin',
      email: 'admin@gmail.com',
      admin: true,
      password: 'admin'
    });

    await Student.add({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin',
      rollno: '169105077',
      target: 'CSE6B'
    });
    Log.main.info('ACCOUNTS SEEDED');
  }

  private async iniQuestions(): Promise<void> {
    await Question.addMany([
      {
        courseCode: 'CS1501',
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
        courseCode: 'CS1501',
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
        courseCode: 'CS1501',
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
        courseCode: 'CS1501',
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
        courseCode: 'CS1501',
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

export {
  App,
  Request,
  Response
};
