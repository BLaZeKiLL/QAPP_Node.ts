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
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../Modules/mongo");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const logger_1 = require("../Modules/logger");
/**
 * Types of questions
 */
var QuestionType;
(function (QuestionType) {
    QuestionType[QuestionType["MCQ_SINGLE"] = 0] = "MCQ_SINGLE";
    QuestionType[QuestionType["MCQ_MULTIPLE"] = 1] = "MCQ_MULTIPLE";
})(QuestionType || (QuestionType = {}));
exports.QuestionType = QuestionType;
/**
 * Question Mongo Wrapper
 */
class Question {
    static add(question) {
        return __awaiter(this, void 0, void 0, function* () {
            question.type = QuestionType[question.type];
            return mongo_1.Mongo.add(Question.DBmodel, question);
        });
    }
    static addMany(questions) {
        return __awaiter(this, void 0, void 0, function* () {
            questions.forEach((question) => {
                question.type = QuestionType[question.type];
            });
            return mongo_1.Mongo.addMany(Question.DBmodel, questions);
        });
    }
    static get(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_1.Mongo.get(Question.DBmodel, filter);
        });
    }
    static getOne(filter, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_1.Mongo.getOne(Question.DBmodel, filter, id);
        });
    }
    static update(filter, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.Log.main.info(JSON.stringify(filter));
                return yield mongo_1.Mongo.update(Question.DBmodel, filter, id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_1.Mongo.delete(Question.DBmodel, id);
        });
    }
}
/**
 * Question schema
 * @property {String} courseCode Course-Code of the question
 * @property {String} type Question type
 * @property {String} statement Question statement
 * @property {option[]} options Array of options of the question
 */
Question.schema = new mongo_1.Schema({
    courseCode: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['MCQ_SINGLE', 'MCQ_MULTIPLE'],
        required: true
    },
    statement: {
        type: String,
        required: true
    },
    options: [{
            _id: false,
            statement: {
                type: String,
                required: true
            },
            isAns: {
                type: Boolean,
                required: true
            }
        }],
}).index({ courseCode: 1, type: 1, statement: 1 }, { unique: true }).plugin(mongoose_unique_validator_1.default);
/**
 * Mongoose Model
 */
Question.DBmodel = mongo_1.model('Question', Question.schema);
exports.Question = Question;
//# sourceMappingURL=question.model.js.map