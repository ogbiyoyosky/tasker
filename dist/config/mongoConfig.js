"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var mongo_uri;
if (process.env.NODE_ENV != "test") {
    mongo_uri = process.env.MONGO_URI;
}
else {
    mongo_uri = process.env.TEST_MONGO_URI;
}
console.log({ mongo_uri: mongo_uri });
var mongoConfig = {
    mongo_uri: mongo_uri,
};
exports.default = mongoConfig;
//# sourceMappingURL=mongoConfig.js.map