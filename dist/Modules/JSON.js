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
const Promise_1 = require("./Promise");
const logger_1 = require("./logger");
class JSONHandler {
    static saveData(fileName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise_1.fs_writeFile(this.PATH + fileName, JSON.stringify(data));
                logger_1.Log.main.info('DATA SAVED');
                return true;
            }
            catch (error) {
                logger_1.Log.main.error('JSON SERIALIZATION');
                logger_1.Log.main.error(error);
                throw new Error('JSON SERIALIZATION');
            }
        });
    }
    static readData(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = JSON.parse((yield Promise_1.fs_readFile(this.PATH + fileName)).toString());
                return data;
            }
            catch (error) {
                throw new Error('JSON SERIALIZATION');
            }
        });
    }
}
JSONHandler.PATH = '../Static/';
exports.JSONHandler = JSONHandler;
//# sourceMappingURL=JSON.js.map