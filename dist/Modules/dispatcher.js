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
const quiz_model_1 = require("../Models/quiz.model");
const logger_1 = require("./logger");
/**
 * Logic needs to be changed
 *
 * @class Dispatcher
 */
class Dispatcher {
    // public static distribute(target: string, quiz: IQuiz): void {
    //   Log.main.info('QUIZ READY FOR DISPATCHING: ' + target);
    //   this.quizes.set(target, { _id: quiz._id.toString(), JSON: JSON.stringify(quiz) });
    // }
    // public static get(target: string): {_id: string, JSON: string} {
    //   const quiz = this.quizes.get(target);
    //   if (quiz === undefined || quiz === null) {
    //     throw new Error('Quiz Not Found');
    //   } else {
    //     Log.main.info('QUIZ DISPATCHED');
    //     return quiz;
    //   }
    // }
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
// #TODO remove conmented code
// private static quizes: Map<string, {_id: string, JSON: string}> = new Map<string, {_id: string, JSON: string}>();
Dispatcher.stu_email_qid_map = new Map();
Dispatcher.qid_qjson_map = new Map();
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=dispatcher.js.map