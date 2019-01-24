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
const admin = __importStar(require("firebase-admin"));
const account = __importStar(require("../Static/qapp-firebase-firebase-adminsdk-moh1o-22bcdb968c.json"));
const logger_1 = require("./logger");
class Firebase {
    static connect() {
        admin.initializeApp({
            credential: admin.credential.cert(account),
            databaseURL: Firebase.url
        });
    }
    /**
     * subscribe a token to a topic
     * @param {Object} target target object
     * @param {string} token device ID
     */
    static subscribe(target, token) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.Log.main.info('SUBSCRIBING');
            try {
                const response = yield admin.messaging().subscribeToTopic(token, target);
                logger_1.Log.main.info('SUCCESSFULLY SUBSCRIBED TO TOPIC : ' + response.successCount);
                return true;
            }
            catch (error) {
                logger_1.Log.main.error('FIREBASE');
                logger_1.Log.main.error(error);
            }
        });
    }
    /**
     * unsubscribe a token to a topic
     * @param {Object} target target object
     * @param {string} token device ID
     */
    static unsubscribe(target, token) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.Log.main.info('UNSUBSCRIBING');
            try {
                const response = yield admin.messaging().unsubscribeFromTopic(token, target);
                logger_1.Log.main.info('SUCCESSFULLY UNSUBSCRIBED FROM TOPIC : ' + response.successCount);
                return true;
            }
            catch (error) {
                logger_1.Log.main.error('FIREBASE');
                logger_1.Log.main.error(error);
            }
        });
    }
    static quizCard(quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const targets = quiz.targets;
                const date = quiz.date;
                date.setTime(date.getTime() + date.getTimezoneOffset());
                quiz.date = date.toISOString();
                quiz.targets = undefined;
                quiz.questions = undefined;
                quiz.results = undefined;
                quiz._id = undefined;
                quiz.setQuestions = undefined;
                const message = `${quiz.courseCode} Quiz Scheduled At ${quiz.date}`;
                const payload = JSON.stringify(quiz);
                targets.forEach((target) => __awaiter(this, void 0, void 0, function* () {
                    yield this.broadcast(target, { quizData: payload }, message, 'QAPP');
                }));
                logger_1.Log.main.info(`QUIZ CARD DATA SENT FOR ${quiz.date} COMPUTED ${date.toISOString()}`);
                return true;
            }
            catch (error) {
                logger_1.Log.main.error(error);
            }
        });
    }
    static reminder(target) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.broadcast(target, { request: 'true' }, 'Quiz Reminder', 'QAPP');
                logger_1.Log.main.info('QUIZ REMINDER SENT');
            }
            catch (error) {
                logger_1.Log.main.error(error);
            }
        });
    }
    static broadcast(topic, payload, message, title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield admin.messaging().sendToTopic(topic, {
                    data: payload,
                    notification: {
                        title: title,
                        body: message
                    },
                });
            }
            catch (error) {
                logger_1.Log.main.error('FIREBASE');
                logger_1.Log.main.error(error);
            }
        });
    }
}
Firebase.url = 'https://qapp-firebase.firebaseio.com';
exports.Firebase = Firebase;
//# sourceMappingURL=firebase.js.map