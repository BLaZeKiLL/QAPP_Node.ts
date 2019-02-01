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
const logger_1 = require("../Modules/logger");
const mongoose_1 = require("mongoose");
exports.Schema = mongoose_1.Schema;
exports.model = mongoose_1.model;
class Mongo {
    static connectDB(url) {
        mongoose_1.connect(url, { useNewUrlParser: true, useCreateIndex: true, })
            .catch((error) => {
            throw new mongoose_1.Error('MONGODB');
        });
    }
    static add(model, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield model.create(obj);
                return Object.assign({}, doc._doc, { _id: doc.id });
            }
            catch (error) {
                logger_1.Log.main.error(error);
                throw new mongoose_1.Error('MONGODB');
            }
        });
    }
    static addMany(model, objs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield model.insertMany(objs);
                const rdocs = docs.map((doc) => {
                    return Object.assign({}, doc._doc, { _id: doc.id });
                });
                return rdocs;
            }
            catch (error) {
                const errorData = JSON.parse(error);
                const ids = errorData.result.insertedIds.map((a) => a._id);
                model.find({ _id: { $in: ids } }, (err, docs) => {
                    if (err) {
                        logger_1.Log.main.error(err);
                        throw new mongoose_1.Error('MONGODB');
                    }
                    else {
                        return docs;
                    }
                });
            }
        });
    }
    static get(model, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield model.find(filter ? filter : {});
                return docs.map((doc) => {
                    return Object.assign({}, doc._doc, { _id: doc.id });
                });
            }
            catch (error) {
                logger_1.Log.main.error(error);
                throw new mongoose_1.Error('MONGODB');
            }
        });
    }
    static getOne(model, filter, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let doc;
                if (filter) {
                    doc = yield model.findOne(filter);
                }
                else if (id) {
                    doc = yield model.findById(id);
                }
                else {
                    throw new mongoose_1.Error('Invalid Arguments');
                }
                return Object.assign({}, doc._doc, { _id: doc.id });
            }
            catch (error) {
                logger_1.Log.main.error(error);
                throw new mongoose_1.Error('MONGODB');
            }
        });
    }
    static getOneQuiz(model, filter, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let doc;
                if (filter) {
                    doc = yield model.findOne(filter).populate('questions.question').exec();
                }
                else if (id) {
                    doc = yield model.findById(id).populate('questions.question').exec();
                }
                else {
                    throw new mongoose_1.Error('Invalid Arguments');
                }
                logger_1.Log.main.info('BEFORE  ' + JSON.stringify(doc));
                doc.questions.forEach((element) => {
                    element.question._id = element.question._id.toString();
                });
                logger_1.Log.main.info('AFTER  ' + JSON.stringify(doc));
                return Object.assign({}, doc._doc, { _id: doc.id });
            }
            catch (error) {
                logger_1.Log.main.error(error);
                throw new mongoose_1.Error('MONGODB');
            }
        });
    }
    static delete(model, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model.deleteOne({ _id: id });
                return true;
            }
            catch (error) {
                logger_1.Log.main.error(error);
                throw new mongoose_1.Error('MONGODB');
            }
        });
    }
    static update(model, filter, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model.findByIdAndUpdate(id, filter);
            }
            catch (error) {
                logger_1.Log.main.error(error);
                throw new mongoose_1.Error('MONGODB');
            }
        });
    }
}
exports.Mongo = Mongo;
//# sourceMappingURL=mongo.js.map