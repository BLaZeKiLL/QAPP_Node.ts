"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const ip_1 = __importDefault(require("ip"));
const morgan_1 = __importDefault(require("morgan"));
const graphql_1 = require("../GraphQL/graphql");
const mongo_1 = require("../Modules/mongo");
const firebase_1 = require("../Modules/firebase");
const logger_1 = require("../Modules/logger");
const teacher_model_1 = require("../Models/teacher.model");
const student_model_1 = require("../Models/student.model");
const authentication_1 = require("../Modules/authentication");
const question_model_1 = require("../Models/question.model");
/**
 * The Node-Express Application that will run on the server
 *
 * @export
 * @class App
 */
class App {
    /**
     * Creates the App and calls all the setups()
     * @param MONGODB_NAME Database name to be used
     * @memberof App
     */
    constructor(MONGODB_NAME) {
        this.MONGODB_NAME = MONGODB_NAME;
        this.app = express_1.default();
        process.env.TZ = 'Asia/Kolkata';
        this.setupLoggers();
        this.setupMongoDB();
        this.setupBodyParser();
        this.setupGrapQL();
        this.setupFirebase();
        try {
            // this.ini(); // Uncomment this to add deafult admin account
            // this.iniQuestions(); // Uncomment this to seed question bank
        }
        catch (error) {
            logger_1.Log.main.error(error);
        }
    }
    /**
     * Express app.listen() wrapper
     * @param {() => any} callback called whern server is started
     * @memberof App
     */
    listen(callback) {
        this.app.listen(process.env.PORT || 3000, /*ip.address(),*/ callback());
    }
    /**
     * @returns {string} local URL of the server
     * @memberof App
     */
    getLocalUrl() {
        return `http://localhost:${process.env.PORT || 3000}/`;
    }
    /**
     * @returns {string} ip of the server
     * @memberof App
     */
    getIP() {
        return `http://${ip_1.default.address()}:${process.env.PORT || 3000}/`;
    }
    /**
     * MongoDB setup
     *
     * @private
     * @memberof App
     */
    setupMongoDB() {
        mongo_1.Mongo.connectDB(this.getMongoDBUrl());
    }
    /**
     * Body Parser setup
     *
     * @private
     * @memberof App
     */
    setupBodyParser() {
        this.app.use(cors_1.default()); // remove in production
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.text());
        this.app.use(body_parser_1.default.json({ type: 'application/json' }));
    }
    /**
     * GraphQL strup
     *
     * @private
     * @memberof App
     */
    setupGrapQL() {
        this.app.use('/graphql', (req, res, next) => {
            logger_1.Log.main.verbose(JSON.stringify(req.body));
            next();
        });
        this.app.use('/graphql', authentication_1.authenticate);
        this.app.use('/graphql', new graphql_1.GraphBuilder(true).getMiddleWare());
    }
    /**
     * Logger Setup
     *
     * @private
     * @memberof App
     */
    setupLoggers() {
        logger_1.Log.initialize();
        this.app.use(morgan_1.default('combined', { stream: { write: (message) => logger_1.Log.request.info(message.trim()) } }));
    }
    /**
     * Firebase Setup
     *
     * @private
     * @memberof App
     */
    setupFirebase() {
        firebase_1.Firebase.connect();
    }
    /**
     * Creates the mongodb url depending upon the config
     *
     * @private
     * @returns {string} MongoDB url
     * @memberof App
     */
    getMongoDBUrl() {
        if (process.env.NODE_ENV === 'test') {
            logger_1.Log.main.info('CONNNECTING TO LOCAL TEST DB');
            return `mongodb://localhost:27017/${this.MONGODB_NAME + '_TEST'}`;
        }
        else if (process.env.NODE_ENV === 'local') {
            logger_1.Log.main.info('CONNECTING TO LOCAL DB');
            return `mongodb://localhost:27017/${this.MONGODB_NAME}`;
        }
        else {
            logger_1.Log.main.info('CONNECTING TO CLUSTER');
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
    ini() {
        return __awaiter(this, void 0, void 0, function* () {
            yield teacher_model_1.Teacher.add({
                name: 'Admin',
                email: 'admin@gmail.com',
                password: 'admin'
            });
            yield student_model_1.Student.add({
                email: 'admin@gmail.com',
                password: 'admin',
            });
            logger_1.Log.main.info('ACCOUNTS SEEDED');
        });
    }
    /**
     * Question seeder
     *
     * @private
     * @returns {Promise<void>}
     * @memberof App
     */
    iniQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield question_model_1.Question.addMany([
                {
                    statement: 'What is the essentials of dynamic programing ?',
                    type: question_model_1.QuestionType.MCQ_MULTIPLE,
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
                    statement: 'In a max-heap, element with the greatest key is always in the which node ?',
                    type: question_model_1.QuestionType.MCQ_SINGLE,
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
                    statement: 'Which of the follwing have N complexity ?',
                    type: question_model_1.QuestionType.MCQ_MULTIPLE,
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
                    statement: 'Which of the following problems can be solved using recursion ?',
                    type: question_model_1.QuestionType.MCQ_SINGLE,
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
                    statement: 'What are the types of complexity analysis ?',
                    type: question_model_1.QuestionType.MCQ_MULTIPLE,
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
            logger_1.Log.main.info('QUESTION BANK SEEDED');
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map