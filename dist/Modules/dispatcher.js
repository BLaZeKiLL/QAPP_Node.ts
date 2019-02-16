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
    static clear() {
        this.quizes.clear();
    }
}
Dispatcher.quizes = new Map();
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=dispatcher.js.map