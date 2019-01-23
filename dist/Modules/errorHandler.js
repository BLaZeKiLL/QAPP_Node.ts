"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
function Handle(error) {
    const log = logger_1.Log.main.error;
    switch (error.message) {
        case 'AUTH': {
            log('INVALID AUTH');
            return {
                message: 'Invalid Auth',
                code: 1
            };
        }
        case 'MONGODB': {
            log('DATABASE ERROR');
            return {
                message: 'Database Error',
                code: 5
            };
        }
        case 'JSON SERIALIZATION': {
            log('JSON SERIALIZATION ERROR');
            return {
                message: 'JSON Serialization error',
                code: 6
            };
        }
        default: {
            log('ERROR' + error.stack);
            return {
                message: 'Error',
                code: 99
            };
        }
    }
}
exports.Handle = Handle;
//# sourceMappingURL=errorHandler.js.map