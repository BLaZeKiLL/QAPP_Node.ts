"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../Modules/mongo");
const scheduler_1 = require("../Modules/scheduler");
const logger_1 = require("../Modules/logger");
const dispatcher_1 = require("../Modules/dispatcher");
class Quiz {
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
    static add(quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield mongo_1.Mongo.add(Quiz.DBmodel, quiz);
                if (doc) {
                    const id = doc._id;
                    scheduler_1.Scheduler.process(doc.targetEmails);
                    dispatcher_1.Dispatcher.cache(doc);
                    logger_1.Log.main.info(`QUIZ ${id} ADDED TO DB`);
                    return true;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getOne(filter, id, populate = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongo_1.Mongo.getOneQuiz(Quiz.DBmodel, filter, id);
            }
            catch (error) {
                logger_1.Log.main.error('POPULATION ERROR');
                throw error;
            }
        });
    }
    static addResult(update, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongo_1.Mongo.addToArray(this.DBmodel, update, id);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
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
Quiz.schema = new mongo_1.Schema({
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
                type: mongo_1.Schema.Types.ObjectId,
                ref: 'Question',
                required: true
            },
            imageURL: String,
        }],
    results: [{
            type: mongo_1.Schema.Types.ObjectId,
            ref: 'Result'
        }]
});
Quiz.DBmodel = mongo_1.model('Quiz', Quiz.schema);
exports.Quiz = Quiz;
//# sourceMappingURL=quiz.model.js.map