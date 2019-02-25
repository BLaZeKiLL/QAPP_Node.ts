"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_resolver_1 = require("./admin.resolver");
const misc_resolver_1 = require("./misc.resolver");
const question_resolver_1 = require("./question.resolver");
const quiz_resolver_1 = require("./quiz.resolver");
const result_resolver_1 = require("./result.resolver");
const student_resolver_1 = require("./student.resolver");
const teacher_resolver_1 = require("./teacher.resolver");
exports.Resolvers = Object.assign({}, admin_resolver_1.Query, misc_resolver_1.Query, question_resolver_1.Query, quiz_resolver_1.Query, result_resolver_1.Query, student_resolver_1.Query, teacher_resolver_1.Query, admin_resolver_1.Mutation, misc_resolver_1.Mutation, question_resolver_1.Mutation, quiz_resolver_1.Mutation, result_resolver_1.Mutation, student_resolver_1.Mutation, teacher_resolver_1.Mutation);
//# sourceMappingURL=index.resolver.js.map