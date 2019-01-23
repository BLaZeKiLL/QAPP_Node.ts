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
const nodemailer = __importStar(require("nodemailer"));
class Postman {
    static accountMail(reciver, type, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const mail = {
                from: 'developer.qapp@gmail.com',
                to: reciver,
                subject: `QAPP new ${type} account password`,
                text: `PASSWORD : ${password}`
            };
            try {
                yield Postman.mailer.sendMail(mail);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
Postman.mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'developer.qapp@gmail.com',
        pass: 'developer@QAPP'
    }
});
exports.Postman = Postman;
//# sourceMappingURL=postman.js.map