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
const logger_1 = require("../../Modules/logger");
const misc_model_1 = require("../../Models/misc.model");
const teacher_model_1 = require("../../Models/teacher.model");
const authentication_1 = require("../../Modules/authentication");
const errorHandler_1 = require("../../Modules/errorHandler");
module.exports = {
    teacherLogin: (args) => __awaiter(this, void 0, void 0, function* () {
        logger_1.Log.main.info(`Email: ${args.email} Password: ${args.password}`);
        try {
            const teacher = yield teacher_model_1.Teacher.getOne({ email: args.email });
            if (!teacher) {
                throw new Error('AUTH');
            }
            const valid = yield bcryptjs_1.default.compare(args.password, teacher.password);
            if (!valid) {
                throw new Error('AUTH');
            }
            logger_1.Log.main.info('AUTH OK');
            return {
                auth: {
                    id: teacher._id,
                    name: teacher.name,
                    email: teacher.email,
                    admin: teacher.admin,
                    token: jsonwebtoken_1.default.sign({
                        id: teacher._id,
                        email: teacher.email,
                        power: teacher.admin ? misc_model_1.Power.ADMIN : misc_model_1.Power.TEACHER
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
    updateTeacher: (args, req) => __awaiter(this, void 0, void 0, function* () {
        try {
            authentication_1.isTeacher(req);
            const teacher = {};
            if (args.teacher.name !== undefined)
                teacher.name = args.teacher.name;
            if (args.teacher.email !== undefined)
                teacher.email = args.teacher.email;
            if (args.teacher.password !== undefined)
                teacher.password = args.teacher.password;
            if (args.teacher.admin !== undefined)
                teacher.admin = args.teacher.admin;
            return yield teacher_model_1.Teacher.update(teacher, args.teacher._id);
        }
        catch (error) {
            logger_1.Log.main.error('ACCOUNT UPDATE ERROR');
            return false;
        }
    })
};
//# sourceMappingURL=teacher.resolver.js.map