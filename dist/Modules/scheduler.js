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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron = __importStar(require("cron"));
const moment_1 = __importDefault(require("moment"));
const dispatcher_1 = require("./dispatcher");
const logger_1 = require("./logger");
const quiz_model_1 = require("../Models/quiz.model");
const firebase_1 = require("./firebase");
const JSON_1 = require("./JSON");
class Scheduler {
    static schedule(quizID, date) {
        const istdate = moment_1.default.utc(date.toUTCString()).local();
        logger_1.Log.main.info(`QUIZ ${quizID} SCHEDULED FOR ${istdate.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')}`);
        new cron.CronJob(istdate.toDate(), () => __awaiter(this, void 0, void 0, function* () {
            try {
                const quiz = yield quiz_model_1.Quiz.getOne(undefined, quizID, true);
                JSON_1.JSONHandler.saveData('./quiz.json', quiz);
                quiz.targets.forEach((target) => {
                    firebase_1.Firebase.reminder(target);
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