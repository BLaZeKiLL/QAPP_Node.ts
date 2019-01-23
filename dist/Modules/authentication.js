"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const misc_model_1 = require("../Models/misc.model");
const logger_1 = require("./logger");
const APP_SECRET = 'iuwbviudqvtiuvtwd';
exports.APP_SECRET = APP_SECRET;
function authenticate(req, res, next) {
    const token = req.get('Authorization');
    if (token == undefined) {
        req.isStudent = false;
        req.isTeacher = false;
        req.isAdmin = false;
        next();
        return;
    }
    if (!token) {
        req.isStudent = false;
        req.isTeacher = false;
        req.isAdmin = false;
        next();
        return;
    }
    const decodedToken = jwt.verify(token, APP_SECRET);
    if (!decodedToken) {
        req.isStudent = false;
        req.isTeacher = false;
        req.isAdmin = false;
        next();
        return;
    }
    logger_1.Log.main.info(`DECODED TOKEN ${JSON.stringify(decodedToken)}`);
    switch (decodedToken.power) {
        case misc_model_1.Power.STUDENT: {
            req.isStudent = true;
            req.isTeacher = false;
            req.isAdmin = false;
            logger_1.Log.main.info('STUDENT REQUEST');
            next();
            return;
        }
        case misc_model_1.Power.TEACHER: {
            req.isStudent = false;
            req.isTeacher = true;
            req.isAdmin = false;
            logger_1.Log.main.info('TEACHER REQUEST');
            next();
            return;
        }
        case misc_model_1.Power.ADMIN: {
            req.isStudent = false;
            req.isTeacher = true;
            req.isAdmin = true;
            logger_1.Log.main.info('ADMIN REQUEST');
            next();
            return;
        }
    }
}
exports.authenticate = authenticate;
function isStudent(req) {
    if (!req.isStudent) {
        throw new Error('Not Enough Power');
    }
}
exports.isStudent = isStudent;
function isTeacher(req) {
    if (!req.isTeacher) {
        throw new Error('Not Enough Power');
    }
}
exports.isTeacher = isTeacher;
function isAdmin(req) {
    if (!req.isAdmin) {
        throw new Error('Not Enough Power');
    }
}
exports.isAdmin = isAdmin;
//# sourceMappingURL=authentication.js.map