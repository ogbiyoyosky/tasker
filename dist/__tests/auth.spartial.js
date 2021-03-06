"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../app"));
var makeRequest = supertest_1.default(app_1.default);
//import FixtureModel from "../models/Fixture";
var id;
var adminToken;
var userToken;
var InvalidToken;
var invalidRefreshToken = "nfjfnkrfmfkmkmfkmffmmfmmf";
var refreshToken;
exports.default = (function () {
    describe("User  Mangement and Authentication", function () {
        test("should register a user", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest.post("/api/auth/register").send({
                            firstName: "emmanuel",
                            lastName: "ogbiyoyo",
                            email: "user@gmail.com",
                            password: "password",
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(201);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 400 when the user already exist", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest.post("/api/auth/register").send({
                            firstName: "emmanuel",
                            lastName: "ogbiyoyo",
                            email: "user@gmail.com",
                            password: "password",
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(409);
                        expect(res.body.message).toBe("Account already exist");
                        expect(res.body.status_code).toBe(409);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should register a admin", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest.post("/api/auth/admin/register").send({
                            firstName: "emmanuel",
                            lastName: "ogbiyoyo",
                            email: "freeman@gmail.com",
                            password: "password",
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(201);
                        expect(res.body.message).toBe("Account successfully created");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 400 when the admin already exist", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest.post("/api/auth/admin/register").send({
                            firstName: "emmanuel",
                            lastName: "ogbiyoyo",
                            email: "freeman@gmail.com",
                            password: "password",
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(409);
                        expect(res.body.message).toBe("Account already exist");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should authenticate a user", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest.post("/api/auth/signin").send({
                            email: "user@gmail.com",
                            password: "password",
                        })];
                    case 1:
                        res = _a.sent();
                        userToken = res.body.results[0].accessToken;
                        refreshToken = res.body.results[0].refreshToken;
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully logged In");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should authenticate an admin", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest.post("/api/auth/signin").send({
                            email: "freeman@gmail.com",
                            password: "password",
                        })];
                    case 1:
                        res = _a.sent();
                        adminToken = res.body.results[0].accessToken;
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully logged In");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 400 when account does not exist during authenticate a user", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest.post("/api/auth/signin").send({
                            email: "freeman@gmail111.com",
                            password: "password",
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        expect(res.body.message).toBe("Account not found");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 400 when account does not exist during authenticate a user", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest.post("/api/auth/signin").send({
                            email: "freeman@gmail.com",
                            password: "password23",
                        })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        expect(res.body.message).toBe("Invalid email or password");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 401 when token not passed to generate refresh token", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .post("/api/auth/refresh-token")
                            .send({})];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(401);
                        expect(res.body.message).toBe("Provid a valid token");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 401 when passed an invalid token to generate refresh token", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .post("/api/auth/refresh-token")
                            .send({ refreshToken: invalidRefreshToken })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(401);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 200 when passed an valid token to generate refresh token", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .post("/api/auth/refresh-token")
                            .send({ token: refreshToken })];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully generated new credentials");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=auth.spartial.js.map