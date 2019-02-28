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
/**
 * Types of questions
 */
var QuestionType;
(function (QuestionType) {
    QuestionType["MCQ_SINGLE"] = "MCQ_SINGLE";
    QuestionType["MCQ_MULTIPLE"] = "MCQ_MULTIPLE";
})(QuestionType || (QuestionType = {}));
exports.QuestionType = QuestionType;
/**
 * Question Mongo Wrapper
 */
class Question {
    static add(question) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongo_1.Mongo.add(Question.DBmodel, question);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static addMany(questions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongo_1.Mongo.addMany(Question.DBmodel, questions);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static get(searchQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return mongo_1.MongoUtils.bsonConverterArray(yield this.DBmodel.find({ $text: { $search: searchQuery } })
                    // .skip(20) // pagination controls
                    // .limit(10)
                    .exec());
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getOne(filter, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongo_1.Mongo.getOne(Question.DBmodel, filter, id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static update(update, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongo_1.Mongo.update(Question.DBmodel, update, id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongo_1.Mongo.delete(Question.DBmodel, id);
            }
            catch (error) {
                throw error;
            }
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
})
    .index({ statement: 'text' })
    .index({ type: 1, statement: 1 }, { unique: true })
    .plugin(mongoose_unique_validator_1.default);
/**
 * Mongoose Model
 */
Question.DBmodel = mongo_1.model('Question', Question.schema);
exports.Question = Question;
//# sourceMappingURL=question.model.js.map