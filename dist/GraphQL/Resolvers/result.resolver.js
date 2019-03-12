"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const result_model_1 = require("../../Models/result.model");
const authentication_1 = require("../../Modules/authentication");
const errorHandler_1 = require("../../Modules/errorHandler");
const student_model_1 = require("../../Models/student.model");
const quiz_model_1 = require("../../Models/quiz.model");
const logger_1 = require("../../Modules/logger");
// #TODO implement resolvers
const Query = {
    getStudentResults: (args, req) => __awaiter(this, void 0, void 0, function* () {
    }),
    getQuizResults: (args, req) => __awaiter(this, void 0, void 0, function* () {
        try {
            const quiz = yield quiz_model_1.Quiz.getOne(undefined, args.quizID);
            const results = [];
            quiz.results.forEach((result) => __awaiter(this, void 0, void 0, function* () {
                results.push({
                    score: result.score
                });
            }));
            return {
                result: results,
                status: {
                    code: 0,
                    message: 'OK'
                }
            };
        }
        catch (error) {
            logger_1.Log.main.error('RESULT ERROR');
            logger_1.Log.main.error(error);
            return {
                status: {
                    code: 2,
                    message: 'ERROR'
                }
            };
        }
    })
};
exports.Query = Query;
const Mutation = {
    addResult: (args, req) => __awaiter(this, void 0, void 0, function* () {
        try {
            authentication_1.isStudent(req);
            const result = yield result_model_1.Result.addResult(args.result);
            logger_1.Log.main.info(`RESULT ADDED: ${JSON.stringify(result)}`);
            student_model_1.Student.addResult({ results: result._id }, result.studentID);
            quiz_model_1.Quiz.addResult({ results: result._id }, result.quizID);
            return {
                result: result,
                status: {
                    message: 'Ok',
                    code: 0
                }
            };
        }
        catch (error) {
            return {
                status: errorHandler_1.Handle(error)
            };
        }
    })
};
exports.Mutation = Mutation;
//# sourceMappingURL=result.resolver.js.map