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
const errorHandler_1 = require("../../Modules/errorHandler");
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
        catch (error) {
            return {
                status: errorHandler_1.Handle(error)
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
        catch (error) {
            return {
                status: errorHandler_1.Handle(error)
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
        catch (error) {
            return {
                status: errorHandler_1.Handle(error)
            };
        }
    }),
    updateQuestion: (args, req) => __awaiter(this, void 0, void 0, function* () {
        try {
            authentication_1.isTeacher(req);
            yield question_model_1.Question.update({
                courseCode: args.question.courseCode,
                statement: args.question.statement,
                type: args.question.type,
                options: args.question.options
            }, args.question._id);
            return true;
        }
        catch (error) {
            errorHandler_1.Handle(error);
            return false;
        }
    }),
    deleteQuestion: (args, req) => __awaiter(this, void 0, void 0, function* () {
        authentication_1.isTeacher(req);
        return question_model_1.Question.delete(args.id);
    })
};
//# sourceMappingURL=question.resolver.js.map