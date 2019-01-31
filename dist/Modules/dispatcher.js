"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const logger_1 = require("./logger");
class Dispatcher {
    static distribute(target, quiz) {
        logger_1.Log.main.info('QUIZ READY FOR DISPATCHING: ' + target);
        fs.writeFile('./quiz.json', quiz, () => {
            logger_1.Log.main.info('QUIZ SERIALIZED');
        });
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