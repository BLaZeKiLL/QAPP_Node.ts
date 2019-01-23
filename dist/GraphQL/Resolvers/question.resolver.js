"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const question_model_1 = require("../../Models/question.model");
const authentication_1 = require("../../Modules/authentication");
const logger_1 = require("../../Modules/logger");
module.exports = {
    getQuestions: (args, req) => __awaiter(this, void 0, void 0, function* () {
        try {
            authentication_1.isTeacher(req);
            logger_1.Log.main.info(`QUERY FOR QUESTION: ${args.courseCode}`);
            return {
                questions: yield question_model_1.Question.get(args),
                status: {
                    code: 0,
                    message: 'OK'
                }
            };
        }
        catch (_a) {
            logger_1.Log.main.error('QUESTIONS ERROR');
            return {
                status: {
                    code: 2,
                    message: 'ERROR'
                }
            };
        }
    }),
    addQuestion: (args, req) => __awaiter(this, void 0, void 0, function* () {
        try {
            authentication_1.isTeacher(req);
            return {
                question: yield question_model_1.Question.add(args.question),
                status: {
                    code: 0,
                    message: 'OK'
                }
            };
        }
        catch (_b) {
            logger_1.Log.main.error('QUESTION ADD ERROR');
            return {
                status: {
                    code: 2,
                    message: 'ERROR'
                }
            };
        }
    }),
    addQuestions: (args, req) => __awaiter(this, void 0, void 0, function* () {
        try {
            authentication_1.isTeacher(req);
            return {
                questions: yield question_model_1.Question.addMany(args.questions),
                status: {
                    code: 0,
                    message: 'OK'
                }
            };
        }
        catch (_c) {
            logger_1.Log.main.error('QUESTIONS ADD ERROR');
            return {
                status: {
                    code: 2,
                    message: 'ERROR'
                }
            };
        }
    }),
    deleteQuestion: (args, req) => __awaiter(this, void 0, void 0, function* () {
        authentication_1.isTeacher(req);
        return question_model_1.Question.delete(args.id);
    })
};
//# sourceMappingURL=question.resolver.js.map