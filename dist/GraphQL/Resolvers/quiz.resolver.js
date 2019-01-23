"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const quiz_model_1 = require("../../Models/quiz.model");
const authentication_1 = require("../../Modules/authentication");
const dispatcher_1 = require("../../Modules/dispatcher");
const logger_1 = require("../../Modules/logger");
module.exports = {
    quiz: (args, req) => {
        try {
            authentication_1.isStudent(req);
            return {
                quiz: dispatcher_1.Dispatcher.get(args.target),
                status: {
                    code: 0,
                    message: 'OK'
                }
            };
        }
        catch (_a) {
            logger_1.Log.main.error('QUIZ ERROR');
            return {
                status: {
                    code: 2,
                    message: 'ERROR'
                }
            };
        }
    },
    addQuiz: (args, req) => __awaiter(this, void 0, void 0, function* () {
        authentication_1.isTeacher(req);
        return quiz_model_1.Quiz.add(args.quiz);
    })
};
//# sourceMappingURL=quiz.resolver.js.map