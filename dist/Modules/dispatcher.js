"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
class Dispatcher {
    static distribute(target, quiz) {
        logger_1.Log.main.info('QUIZ READY FOR DISPATCHING: ' + target);
        logger_1.Log.main.info(JSON.stringify(quiz));
        this.quizes.set(target, quiz);
    }
    static get(target) {
        const quiz = this.quizes.get(target);
        if (quiz == undefined) {
            throw new Error('Quiz Not Found');
        }
        logger_1.Log.main.info('QUIZ DISPATCHED');
        return quiz;
    }
    static clear() {
        this.quizes.clear();
    }
}
Dispatcher.quizes = new Map();
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=dispatcher.js.map