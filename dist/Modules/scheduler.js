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
const passwordGenerator = __importStar(require("randomstring"));
const logger_1 = require("./logger");
const firebase_1 = require("./firebase");
const student_model_1 = require("../Models/student.model");
const postman_1 = require("./postman");
class Scheduler {
    static process(emails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stu_accounts = yield student_model_1.Student.Model.find({
                    'email': {
                        $in: emails
                    }
                });
                const deviceIDs = stu_accounts.map(student => student.deviceID);
                console.log(deviceIDs.filter(deviceID => deviceID !== undefined));
                firebase_1.Firebase.reminder_id(deviceIDs.filter(deviceID => deviceID !== undefined));
                const stu_emails = stu_accounts.map(student => student.email);
                logger_1.Log.main.info(`OLD ACCOUNTS: ${JSON.stringify(stu_emails)}`);
                const new_emails = emails.filter(x => stu_emails.indexOf(x) === -1);
                logger_1.Log.main.info(`NEW ACCOUNTS: ${JSON.stringify(new_emails)}`);
                new_emails.forEach(email => {
                    const password = passwordGenerator.generate(6);
                    logger_1.Log.main.info(`EMAIL: ${email} PASSWORD: ${password}`);
                    postman_1.Postman.accountMail(email, 'Student', password);
                    student_model_1.Student.add({
                        email: email,
                        password: password
                    });
                });
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.Scheduler = Scheduler;
//# sourceMappingURL=scheduler.js.map