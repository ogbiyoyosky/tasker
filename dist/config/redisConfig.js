"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var redisConfig = {
    port: parseInt(process.env.REDIS_PORT, 10),
    host: process.env.REDIS_HOST,
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
};
exports.default = redisConfig;
//# sourceMappingURL=redisConfig.js.map