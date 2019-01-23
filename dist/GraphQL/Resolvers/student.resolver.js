"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const student_model_1 = require("../../Models/student.model");
const authentication_1 = require("../../Modules/authentication");
const errorHandler_1 = require("../../Modules/errorHandler");
const logger_1 = require("../../Modules/logger");
const firebase_1 = require("../../Modules/firebase");
module.exports = {
    studentLogin: (args) => __awaiter(this, void 0, void 0, function* () {
        try {
            const student = yield student_model_1.Student.getOne({ email: args.email });
            if (!student) {
                throw new Error('AUTH');
            }
            const valid = yield bcryptjs_1.default.compare(args.password, student.password);
            if (!valid) {
                throw new Error('AUTH');
            }
            logger_1.Log.main.info('AUTH OK');
            if (!student.deviceID || student.deviceID !== args.deviceID) {
                student_model_1.Student.update({ deviceID: args.deviceID }, student._id);
                firebase_1.Firebase.subscribe(student.target, args.deviceID);
                logger_1.Log.main.info('DEVICE ID UPDATED');
            }
            return {
                auth: {
                    id: student._id,
                    name: student.name,
                    email: student.email,
                    rollno: student.rollno,
                    target: student.target,
                    token: jsonwebtoken_1.default.sign({
                        id: student._id,
                        email: student.email,
                    }, authentication_1.APP_SECRET, {
                        expiresIn: '365 days'
                    }),
                },
                status: {
                    message: 'OK',
                    code: 0
                }
            };
        }
        catch (error) {
            return {
                status: errorHandler_1.Handle(error)
            };
        }
    }),
    studentResults: (args) => {
    }
};
//# sourceMappingURL=student.resolver.js.map