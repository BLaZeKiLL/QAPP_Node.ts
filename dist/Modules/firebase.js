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
const admin = __importStar(require("firebase-admin"));
const moment_1 = __importDefault(require("moment"));
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
    static quizCard(id, quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const targets = quiz.targets;
                const date = moment_1.default.utc(quiz.date.toUTCString()).local();
                // date.setTime(date.getTime() + date.getTimezoneOffset());
                quiz.date = date.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
                quiz._id = id;
                quiz.targets = undefined;
                quiz.questions = undefined;
                quiz.results = undefined;
                quiz.setQuestions = undefined;
                // const message = `${quiz.courseCode} Quiz Scheduled At ${quiz.date}`;
                const payload = JSON.stringify(quiz);
                targets.forEach((target) => __awaiter(this, void 0, void 0, function* () {
                    yield this.dataload(target, { quizData: payload });
                }));
                logger_1.Log.main.info(`QUIZ CARD DATA SENT: ${JSON.stringify(quiz)}`);
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
                yield this.dataload(target, { request: 'true' });
                logger_1.Log.main.info('QUIZ REMINDER SENT');
            }
            catch (error) {
                logger_1.Log.main.error(error);
            }
        });
    }
    static reminder_id(deviceIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dataload_id(deviceIDs, { request: 'true' });
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
    static dataload(topic, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield admin.messaging().sendToTopic(topic, {
                    data: payload,
                });
            }
            catch (error) {
                logger_1.Log.main.error('FIREBASE');
                logger_1.Log.main.error(error);
            }
        });
    }
    static dataload_id(deviceIDs, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield admin.messaging().sendToDevice(deviceIDs, {
                    data: payload,
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