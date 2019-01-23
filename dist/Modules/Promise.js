"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const util_1 = require("util");
exports.fs_writeFile = util_1.promisify(fs.writeFile);
exports.fs_readFile = util_1.promisify(fs.readFile);
//# sourceMappingURL=Promise.js.map