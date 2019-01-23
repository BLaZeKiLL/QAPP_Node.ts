"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron = __importStar(require("cron"));
const dispatcher_1 = require("./dispatcher");
const logger_1 = require("./logger");
const quiz_model_1 = require("../Models/quiz.model");
const firebase_1 = require("./firebase");
class Scheduler {
    static schedule(quizID, date) {
        date.setTime(date.getTime() + date.getTimezoneOffset());
        logger_1.Log.main.info(`QUIZ ${quizID} SCHEDULED FOR ${date}`);
        new cron.CronJob(date, () => __awaiter(this, void 0, void 0, function* () {
            try {
                const quiz = yield quiz_model_1.Quiz.getOne(undefined, quizID);
                quiz.targets.forEach((target) => {
                    firebase_1.Firebase.broadcast(target);
                    dispatcher_1.Dispatcher.distribute(target, quiz);
                });
            }
            catch (_a) {
            }
        }), undefined, true, 'Asia/Kolkata');
    }
}
exports.Scheduler = Scheduler;
//# sourceMappingURL=scheduler.js.map