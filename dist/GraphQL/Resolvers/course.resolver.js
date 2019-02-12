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
const course_model_1 = require("../../Models/course.model");
const authentication_1 = require("../../Modules/authentication");
const errorHandler_1 = require("../../Modules/errorHandler");
const logger_1 = require("../../Modules/logger");
const Query = {
    getTargets: (args, req) => __awaiter(this, void 0, void 0, function* () {
        try {
            authentication_1.isTeacher(req);
            logger_1.Log.main.info(`TARGETS FOR COURSE CODE: ${args.courseCode}`);
            const data = yield course_model_1.Course.getTargets(args.courseCode);
            return {
                data: data,
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
    })
};
exports.Query = Query;
const Mutation = {
    addCourse: (args, req) => __awaiter(this, void 0, void 0, function* () {
        try {
            return true;
        }
        catch (error) {
        }
    })
};
exports.Mutation = Mutation;
//# sourceMappingURL=course.resolver.js.map