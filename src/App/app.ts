import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import IndexRoutes from '../Routes/index';
import { GraphBuilder } from '../GraphQL/graphql';
import { Mongo } from '../Modules/mongo';
import { Firebase } from '../Modules/firebase';
import { Log } from '../Modules/logger';
import { Teacher } from '../Models/teacher.model';

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
  }

  /**
   * Express app.listen() wrapper
   * @param callback called whern server is started
   */
  public listen(callback: () => any): void {
    this.app.listen(this.PORT, callback());
  }

  /**
   * @returns local URL of the server
   */
  public getLocalUrl(): string {
    return `http://localhost:${this.PORT}/`;
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
  }

}

export {
  App,
  Request,
  Response
};
