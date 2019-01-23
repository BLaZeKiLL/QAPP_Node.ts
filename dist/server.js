"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./App/app");
const logger_1 = require("./Modules/logger");
const app = new app_1.App(+process.env.PORT || 3000, 'QAPP');
app.listen(() => {
    logger_1.Log.main.info('HOME - ' + app.getLocalUrl());
    logger_1.Log.main.info('GRAPHiQL - ' + app.getLocalUrl() + 'graphql/');
    logger_1.Log.main.info('IP - ' + app.getIP());
});
exports.default = app;
//# sourceMappingURL=server.js.map