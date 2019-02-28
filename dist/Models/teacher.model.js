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
const bcrypt = __importStar(require("bcryptjs"));
const mongo_1 = require("../Modules/mongo");
class Teacher {
    static add(teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                teacher.password = yield bcrypt.hash(teacher.password, 12);
                yield mongo_1.Mongo.add(this.DBmodel, teacher);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getOne(filter, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongo_1.Mongo.getOne(Teacher.DBmodel, filter, id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static update(update, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (update.password !== undefined)
                    update.password = yield bcrypt.hash(update.password, 12);
                yield mongo_1.Mongo.update(Teacher.DBmodel, update, id);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
/**
 * Teacher profile schema
 * @property {String} name name of teacher
 * @property {String} username username credential
 * @property {String} password password credential stored as HASH
 */
Teacher.schema = new mongo_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
Teacher.DBmodel = mongo_1.model('Teacher', Teacher.schema);
exports.Teacher = Teacher;
//# sourceMappingURL=teacher.model.js.map