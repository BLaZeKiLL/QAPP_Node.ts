"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../Modules/mongo");
class Result {
}
/**
 * Result Schema
 * @property {String} score Correct Ans / Set Questions
 */
Result.schema = new mongo_1.Schema({
    score: {
        type: String,
        required: true
    }
});
Result.DBmodel = mongo_1.model('Result', Result.schema);
exports.Result = Result;
//# sourceMappingURL=result.model.js.map