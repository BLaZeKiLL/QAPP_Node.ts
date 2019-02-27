"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
/**
 * Logic needs to be changed
 *
 * @class Dispatcher
 */
class Dispatcher {
    static distribute(target, quiz) {
        logger_1.Log.main.info('QUIZ READY FOR DISPATCHING: ' + target);
        this.quizes.set(target, { _id: quiz._id.toString(), JSON: JSON.stringify(quiz) });
    }
    static get(target) {
        const quiz = this.quizes.get(target);
        if (quiz === undefined || quiz === null) {
            throw new Error('Quiz Not Found');
        }
        else {
            logger_1.Log.main.info('QUIZ DISPATCHED');
            return quiz;
        }
    }
    static getFromCache(email) {
        const id = this.stu_email_qid_map.get(email);
        const json = this.qid_qjson_map.get(id);
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
    static cache(quiz) {
        quiz.targetEmails.forEach(email => {
            this.stu_email_qid_map.set(email, quiz._id.toString());
        });
        const light_quiz = Object.create(quiz);
        light_quiz.results = undefined;
        light_quiz.targetEmails = undefined;
        logger_1.Log.main.info(`QUIZ: ${JSON.stringify(quiz)}`);
        logger_1.Log.main.info(`LIGHT QUIZ: ${JSON.stringify(light_quiz)}`);
        this.qid_qjson_map.set(quiz._id.toString(), JSON.stringify(light_quiz));
    }
    static clear() {
        this.quizes.clear();
    }
}
Dispatcher.quizes = new Map();
Dispatcher.stu_email_qid_map = new Map();
Dispatcher.qid_qjson_map = new Map();
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=dispatcher.js.map