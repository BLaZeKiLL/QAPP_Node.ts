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
const quiz_model_1 = require("../../Models/quiz.model");
const authentication_1 = require("../../Modules/authentication");
const dispatcher_1 = require("../../Modules/dispatcher");
const logger_1 = require("../../Modules/logger");
const teacher_model_1 = require("../../Models/teacher.model");
const Query = {
    getQuiz: (args, req) => {
        try {
            authentication_1.isStudent(req);
            logger_1.Log.main.info(`QUIZ REQUESTED FOR ${args.email}`);
            const quizData = dispatcher_1.Dispatcher.getFromCache(args.email);
            return {
                _id: quizData._id,
                JSON: quizData.JSON,
                status: {
                    code: 0,
                    message: 'OK'
                }
            };
        }
        catch (error) {
            logger_1.Log.main.error('QUIZ ERROR');
            logger_1.Log.main.error(error);
            return {
                status: {
                    code: 2,
                    message: 'ERROR'
                }
            };
        }
    },
    getQuizSummary: (args, req) => __awaiter(this, void 0, void 0, function* () {
        try {
            authentication_1.isTeacher(req);
            const teacher = yield teacher_model_1.Teacher.getOne(undefined, args.tid);
            const quizes = yield quiz_model_1.Quiz.Model.find({
                '_id': {
                    $in: teacher.quizies
                }
            });
            const summary = quizes.map((quiz) => {
                return {
                    _id: quiz.id,
                    subject: quiz.subject,
                    No: quiz.No,
                    totalQuestions: quiz.totalQuestions,
                    setQuestions: quiz.setQuestions,
                    date: quiz.date,
                    duration: quiz.duration
                };
            });
            return {
                summary: summary,
                status: {
                    code: 0,
                    message: 'OK'
                }
            };
        }
        catch (error) {
            logger_1.Log.main.error('SUMMARY ERROR');
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
    addQuiz: (args, req) => __awaiter(this, void 0, void 0, function* () {
        authentication_1.isTeacher(req);
        return quiz_model_1.Quiz.add(args.quiz, req.mongoID);
    })
};
exports.Mutation = Mutation;
//# sourceMappingURL=quiz.resolver.js.map