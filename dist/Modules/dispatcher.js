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
const moment_1 = __importDefault(require("moment"));
const quiz_model_1 = require("../Models/quiz.model");
const logger_1 = require("./logger");
/**
 * Triple mapping
 *
 * @class Dispatcher
 */
class Dispatcher {
    static getFromCache(email) {
        const id = this.stu_email_qid_map.get(email);
        const json = this.qid_qjson_map.get(id);
        console.log(email);
        console.log(id);
        if (json === undefined || json === null || id === undefined || id === null) {
            throw new Error('Quiz Not Found');
        }
        else {
            logger_1.Log.main.info('QUIZ DISPATCHED');
            return {
                _id: id,
                JSON: json
            };
        }
    }
    static cache(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const quiz = yield quiz_model_1.Quiz.getOne(undefined, id, true);
                const date = moment_1.default.utc(quiz.date.toUTCString()).local();
                quiz.date = date.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
                quiz.targetEmails.forEach(email => {
                    this.stu_email_qid_map.set(email, quiz._id.toString());
                });
                quiz.results = undefined;
                quiz.targetEmails = undefined;
                logger_1.Log.main.info(`QUIZ: ${JSON.stringify(quiz)}`);
                this.qid_qjson_map.set(quiz._id.toString(), JSON.stringify(quiz));
            }
            catch (error) {
                logger_1.Log.main.info('CACHE ERROR');
            }
        });
    }
    static clear() {
        this.qid_qjson_map.clear();
        this.stu_email_qid_map.clear();
    }
}
Dispatcher.stu_email_qid_map = new Map();
Dispatcher.qid_qjson_map = new Map();
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=dispatcher.js.map