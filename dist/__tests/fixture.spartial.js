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
var User_1 = __importDefault(require("../models/User"));
var Team_1 = __importDefault(require("../models/Team"));
var id;
var adminToken;
var userToken;
var InvalidToken;
var invalidRefreshToken = "nfjfnkrfmfkmkmfkmffmmfmmf";
var refreshToken;
var fixtureId;
var generateLink;
exports.default = (function () {
    describe("Fixture  Mangement", function () {
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
        test("should create a fixture", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .post("/api/fixtures")
                            .send({
                            homeTeam: [{ name: "Manchester City" }, { score: 0 }],
                            awayTeam: [{ name: "Chelsea" }, { score: 0 }],
                            details: [
                                { matchTime: "2019-11-26T16:24:32.674+00:00" },
                                { stadium: "Old Trafford" },
                            ],
                        })
                            .set("authorization", "Bearer " + adminToken)];
                    case 1:
                        res = _a.sent();
                        fixtureId = res.body.results["_id"];
                        expect(res.status).toBe(201);
                        expect(res.body.message).toBe("Fixture successfully created");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should view a single fixture", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .get("/api/fixtures/" + fixtureId)
                            .set("authorization", "Bearer " + adminToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 400 if fixture not found", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .get("/api/fixtures/5f7a180d365e79530a826515")
                            .set("authorization", "Bearer " + adminToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        expect(res.body.message).toBe("Fixture not found");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should generate link for a particular fixture", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .get("/api/fixtures/" + fixtureId + "/generate-link")
                            .set("authorization", "Bearer " + adminToken)];
                    case 1:
                        res = _a.sent();
                        generateLink = res.body.results[0].fixture.generatedLink;
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully generated a unique link for the fixture fixture");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should view a generated fixture link", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .get("/api/fixtures/link/" + generateLink)
                            .set("authorization", "Bearer " + adminToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 400 if fixture not found", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .put("/api/fixtures/5f7a180d365e79530a826515")
                            .set("authorization", "Bearer " + adminToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should view all fixtures", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .get("/api/fixtures/")
                            .set("authorization", "Bearer " + adminToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully  fetched all fixtures");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should edit a particular team", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .put("/api/fixtures/" + fixtureId)
                            .send({
                            homeTeam: [{ name: "Chelsea" }, { score: 0 }],
                            awayTeam: [{ name: "Chelsea" }, { score: 1 }],
                            details: [
                                { matchTime: "2019-11-26T16:24:32.674+00:00" },
                                { stadium: "Old Trafford is bae" },
                            ],
                        })
                            .set("authorization", "Bearer " + adminToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully  updated the Fixture");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should delete a particular fixture", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .delete("/api/fixtures/" + fixtureId)
                            .set("authorization", "Bearer " + adminToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully deleted the fixture");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 400 when deleting a particular fixture that does not exist ", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .delete("/api/fixtures/5f7a180d365e79530a826515")
                            .set("authorization", "Bearer " + adminToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(400);
                        expect(res.body.message).toBe("Fixture not found");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should search for a particular team by query", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest.get("/api/fixtures/search?q=manchester")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully  fetched search results");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 200 for pending fixtures", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .get("/api/fixtures/pending")
                            .set("authorization", "Bearer " + adminToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.status).toBe("ok");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 200 for completed fixtures", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .get("/api/fixtures/completed")
                            .set("authorization", "Bearer " + adminToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.status).toBe("ok");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("clearing table after test");
                        return [4 /*yield*/, User_1.default.deleteMany({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Team_1.default.deleteMany({})];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=fixture.spartial.js.map