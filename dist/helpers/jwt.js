"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.signRefreshToken = exports.verifyAccessToken = exports.signAccessToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwt_1 = __importDefault(require("../config/jwt"));
var createError = require("http-errors");
var redis_connection_1 = require("../redis-connection");
function signAccessToken(payload) {
    return new Promise(function (resolve, reject) {
        var secret = jwt_1.default.appKey;
        var options = {
            expiresIn: "24h",
            issuer: "tasker",
            audience: payload.id,
        };
        jsonwebtoken_1.default.sign(payload, secret, options, function (err, token) {
            if (err) {
                reject(createError.InternalServerError());
                return;
            }
            resolve(token);
        });
    });
}
exports.signAccessToken = signAccessToken;
function signRefreshToken(payload) {
    return new Promise(function (resolve, reject) {
        var secret = jwt_1.default.refreshTokenKey;
        var options = {
            expiresIn: "1y",
            issuer: "zeus",
            audience: payload.id,
        };
        jsonwebtoken_1.default.sign(payload, secret, options, function (err, token) {
            if (err) {
                console.log(err);
                reject(createError.InternalServerError());
                return;
            }
            redis_connection_1.redisClient.SET(payload.id, token, "EX", 365 * 24 * 60 * 60, function (err, reply) {
                if (err) {
                    reject(createError.InternalServerError());
                    return;
                }
                resolve(token);
            });
        });
    });
}
exports.signRefreshToken = signRefreshToken;
function verifyAccessToken(req, res, next) {
    if (!req.headers["authorization"])
        return next(createError.Unauthorized());
    var authHeader = req.headers["authorization"];
    var bearerToken = authHeader.split(" ");
    var token = bearerToken[1];
    jsonwebtoken_1.default.verify(token, jwt_1.default.appKey, function (err, payload) {
        if (err) {
            var message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
            return next(createError.Unauthorized(message));
        }
        req.payload = payload;
        next();
    });
}
exports.verifyAccessToken = verifyAccessToken;
function verifyRefreshToken(refreshToken) {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.default.verify(refreshToken, jwt_1.default.refreshTokenKey, function (err, payload) {
            if (err)
                return reject(createError.Unauthorized());
            var userId = payload.aud;
            redis_connection_1.redisClient.GET(userId, function (err, result) {
                if (err) {
                    reject(createError.InternalServerError());
                    return;
                }
                if (refreshToken === result)
                    return resolve({ id: userId, role: payload.role });
                reject(createError.Unauthorized());
            });
        });
    });
}
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=jwt.js.map