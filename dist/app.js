"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var mongo_connection_1 = __importDefault(require("./mongo-connection"));
var redis_connection_1 = require("./redis-connection");
var limiter_1 = require("./middleware/limiter");
var app = express_1.default();
mongo_connection_1.default();
redis_connection_1.client();
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(limiter_1.rateLimiter);
app.set("port", process.env.PORT || 3000);
app.use(routes_1.default);
app.use(function (req, res, next) {
    return res.status(404).send({
        status: "Not Found",
        message: "Resource Not Found",
        status_code: 404,
    });
});
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    return res.status(err.statusCode || 500).json({
        error: process.env.NODE_ENV === "development" ? err : undefined,
        message: err.message,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map