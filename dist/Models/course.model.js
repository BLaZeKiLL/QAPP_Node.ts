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
const JSON_1 = require("../Modules/JSON");
class Course {
    static addCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    static getTargets(courseCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield JSON_1.JSONHandler.readData(this.FILE_NAME);
            let targets = [];
            courses.forEach((course) => {
                if (course.code === courseCode)
                    targets = course.targets;
            });
            return targets;
        });
    }
}
Course.FILE_NAME = 'course.json';
exports.Course = Course;
//# sourceMappingURL=course.model.js.map