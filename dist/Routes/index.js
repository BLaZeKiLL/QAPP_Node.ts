"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../App/router");
const router = router_1.GetRouter();
router.get('/', (req, res) => {
    res.send('Loading Angular...');
});
exports.default = router;
//# sourceMappingURL=index.js.map