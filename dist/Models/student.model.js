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
class Student {
    static get Model() {
        return this.DBmodel;
    }
    static add(student) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                student.password = yield bcrypt.hash(student.password, 12);
                yield mongo_1.Mongo.add(this.DBmodel, student);
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
                return yield mongo_1.Mongo.getOne(Student.DBmodel, filter, id);
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
                yield mongo_1.Mongo.update(Student.DBmodel, update, id);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static addResult(update, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongo_1.Mongo.addToArray(this.DBmodel, update, id);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
/**
 * Student profile schema
 * @property {String} email username credential
 * @property {String} password password credential stored as HASH
 * @property {String} deviceID Firebase device ID
 * @property {ref[]} result references to results of the student
 */
Student.schema = new mongo_1.Schema({
    email: {
        type: String,
        required: true
    },
    deviceID: String,
    password: {
        type: String,
        required: true
    },
    results: [{
            type: mongo_1.Schema.Types.ObjectId,
            ref: 'Result'
        }]
});
Student.DBmodel = mongo_1.model('Student', Student.schema);
exports.Student = Student;
//# sourceMappingURL=student.model.js.map