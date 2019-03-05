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
// #TODO remove topic specific code
class Firebase {
    static connect() {
        admin.initializeApp({
            credential: admin.credential.cert(account),
            databaseURL: Firebase.url
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