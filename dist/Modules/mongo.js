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
const transform_props_1 = __importDefault(require("transform-props"));
const logger_1 = require("../Modules/logger");
const mongoose_1 = require("mongoose");
exports.Schema = mongoose_1.Schema;
exports.model = mongoose_1.model;
function castToString(arg) {
    return String(arg);
}
class Mongo {
    static connectDB(url) {
        mongoose_1.connect(url, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
            .catch((error) => {
            logger_1.Log.main.error(error);
            throw new mongoose_1.Error('MONGODB');
        });
    }
    static add(model, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield model.create(obj);
                logger_1.Log.main.info('Document Added');
                logger_1.Log.main.verbose(JSON.stringify(doc));
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
                logger_1.Log.main.info('Documents Added');
                logger_1.Log.main.verbose(JSON.stringify(docs));
                const rdocs = docs.map((doc) => {
                    return Object.assign({}, doc._doc, { _id: doc.id });
                });
                return rdocs;
            }
            catch (error) {
                const ids = error.result.insertedIds.map((a) => a._id);
                ids.pop();
                model.find({ _id: { $in: ids } }, (err, docs) => {
                    if (err) {
                        logger_1.Log.main.error('MUL ADD ERROR');
                        logger_1.Log.main.error(err);
                        throw new mongoose_1.Error('MONGODB');
                    }
                    else {
                        logger_1.Log.main.error('DUPLICATES FOUND');
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
                const docObj = doc.toObject();
                transform_props_1.default(docObj, castToString, '_id');
                logger_1.Log.main.info('AFTER  ' + JSON.stringify(docObj));
                return docObj;
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
    static update(model, update, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model.findOneAndUpdate({ _id: id }, { $set: update });
            }
            catch (error) {
                logger_1.Log.main.error(error);
                throw new mongoose_1.Error('MONGODB');
            }
        });
    }
    static addToArray(model, update, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model.findOneAndUpdate({ _id: id }, { $push: update });
            }
            catch (error) {
                logger_1.Log.main.error(error);
                throw new mongoose_1.Error('MONGODB');
            }
        });
    }
}
exports.Mongo = Mongo;
class MongoUtils {
    static bsonConverterArray(docs) {
        const docObjs = [];
        docs.forEach((doc) => {
            docObjs.push(this.bsonConverter(doc));
        });
        return docObjs;
    }
    static bsonConverter(doc) {
        const docObj = doc.toObject();
        transform_props_1.default(docObj, castToString, '_id');
        return docObj;
    }
}
exports.MongoUtils = MongoUtils;
//# sourceMappingURL=mongo.js.map