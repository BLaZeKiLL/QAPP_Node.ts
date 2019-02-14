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
const mongo_1 = require("../Modules/mongo");
class Result {
    static addResult(result) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mongo_1.Mongo.add(this.DBmodel, result);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
/**
 * Result Schema
 * @property {String} score Correct Ans / Set Questions
 */
Result.schema = new mongo_1.Schema({
    score: {
        type: String,
        required: true
    },
    studentID: {
        type: mongo_1.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    quizID: {
        type: mongo_1.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    }
});
Result.DBmodel = mongo_1.model('Result', Result.schema);
exports.Result = Result;
//# sourceMappingURL=result.model.js.map