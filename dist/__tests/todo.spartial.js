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
var id;
var userToken;
var InvalidToken;
var invalidRefreshToken = "nfjfnkrfmfkmkmfkmffmmfmmf";
var refreshToken;
var todoId;
exports.default = (function () {
    describe("Todo Management", function () {
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
                        userToken = res.body.results[0].accessToken;
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully logged In");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should create a todo", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .post("/api/todos")
                            .send({
                            "todoName": "Create A Book1",
                            "description": "Creating the lord of the rings book",
                            "priority": "low",
                            "startTime": "2021-11-26T16:24:32.674+00:00",
                            "endTime": "2022-11-26T16:24:32.674+00:00"
                        })
                            .set("authorization", "Bearer " + userToken)];
                    case 1:
                        res = _a.sent();
                        todoId = res.body.results["_id"];
                        expect(res.status).toBe(201);
                        expect(res.body.message).toBe("Todo successfully created");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should view a single todo", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .get("/api/todos/" + todoId)
                            .set("authorization", "Bearer " + userToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 404 if todo not found", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .get("/api/todos/5f7a180d365e79530a826515")
                            .set("authorization", "Bearer " + userToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(404);
                        expect(res.body.message).toBe("Todo not found");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should view all todo", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .get("/api/todos/")
                            .set("authorization", "Bearer " + userToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully  fetched all todos");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should edit a particular todo", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .put("/api/todos/" + todoId)
                            .send({
                            "todoName": "Update A Book2",
                            "description": "Creating the lord of the rings book",
                            "priority": "low",
                            "startTime": "2021-11-26T16:24:32.674+00:00",
                            "endTime": "2022-11-26T16:24:32.674+00:00"
                        })
                            .set("authorization", "Bearer " + userToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully updated the todo");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should delete a particular todo", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .delete("/api/todos/" + todoId)
                            .set("authorization", "Bearer " + userToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully deleted the todo");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should return 404 when deleting a todo that does not exist", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest
                            .delete("/api/todos/5f7b180d365e79530a826515")
                            .set("authorization", "Bearer " + userToken)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(404);
                        expect(res.body.message).toBe("Todo not Found");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        test("should search for a particular todo by query", function (done) { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeRequest.get("/api/todos/search?q=low")];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        expect(res.body.message).toBe("Successfully  fetched search results");
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=todo.spartial.js.map