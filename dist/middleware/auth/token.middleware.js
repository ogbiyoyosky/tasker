"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var AuthenticationError_1 = __importDefault(require("../../errors/AuthenticationError"));
var secret = process.env.APP_SECRET_KEY;
var verifyToken = {
    verify: function (req, res, next) {
        try {
            var token = req.headers.authorization;
            if (!token) {
                throw new AuthenticationError_1.default();
            }
            var authToken = token.split(" ")[1];
            jsonwebtoken_1.default.verify(authToken, secret, function (err, decoded) {
                if (err) {
                    throw new AuthenticationError_1.default();
                }
                req.id = decoded.id;
                req.role = decoded.role;
                return next();
            });
        }
        catch (err) {
            next(err);
        }
    },
};
exports.default = verifyToken;
//# sourceMappingURL=token.middleware.js.map