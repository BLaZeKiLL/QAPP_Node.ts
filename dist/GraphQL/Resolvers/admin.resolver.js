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
const postman_1 = require("../../Modules/postman");
const student_model_1 = require("../../Models/student.model");
const teacher_model_1 = require("../../Models/teacher.model");
const logger_1 = require("../../Modules/logger");
// #TODO Remove Admin
const Query = {};
exports.Query = Query;
const Mutation = {
    // Dynamic addition based on targets
    addStudent: (args, req) => __awaiter(this, void 0, void 0, function* () {
        args.student.password = passwordGenerator.generate(6);
        postman_1.Postman.accountMail(args.student.email, 'Student', args.student.password);
        logger_1.Log.main.info(`NEW STUDENT: ${JSON.stringify(args.student)}`);
        return student_model_1.Student.add(args.student);
    }),
    // sign up
    addTeacher: (args, req) => __awaiter(this, void 0, void 0, function* () {
        args.teacher.password = passwordGenerator.generate(6);
        postman_1.Postman.accountMail(args.teacher.email, 'Teacher', args.teacher.password);
        logger_1.Log.main.info(`NEW TEACHER: ${JSON.stringify(args.teacher)}`);
        return teacher_model_1.Teacher.add(args.teacher);
    })
};
exports.Mutation = Mutation;
//# sourceMappingURL=admin.resolver.js.map