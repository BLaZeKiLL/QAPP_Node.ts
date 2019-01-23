"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const admin_resolver_1 = __importDefault(require("./admin.resolver"));
const course_resolver_1 = __importDefault(require("./course.resolver"));
const misc_resolver_1 = __importDefault(require("./misc.resolver"));
const question_resolver_1 = __importDefault(require("./question.resolver"));
const quiz_resolver_1 = __importDefault(require("./quiz.resolver"));
const result_resolver_1 = __importDefault(require("./result.resolver"));
const student_resolver_1 = __importDefault(require("./student.resolver"));
const teacher_resolver_1 = __importDefault(require("./teacher.resolver"));
module.exports = Object.assign({}, admin_resolver_1.default, course_resolver_1.default, misc_resolver_1.default, question_resolver_1.default, quiz_resolver_1.default, result_resolver_1.default, student_resolver_1.default, teacher_resolver_1.default);
//# sourceMappingURL=index.resolver.js.map