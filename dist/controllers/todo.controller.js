"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var Todo_1 = __importDefault(require("../models/Todo"));
var httpStatus = __importStar(require("http-status"));
var logger_1 = __importDefault(require("../logger"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var TodoController = /** @class */ (function () {
    function TodoController() {
    }
    /**
     * Create a todo in the database
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    TodoController.createTodo = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, todoName, startTime, endTime, description, priority, postedBy, todo, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, todoName = _a.todoName, startTime = _a.startTime, endTime = _a.endTime, description = _a.description, priority = _a.priority;
                        postedBy = req.id;
                        return [4 /*yield*/, Todo_1.default.create({
                                todoName: todoName,
                                startTime: startTime,
                                endTime: endTime,
                                description: description,
                                postedBy: postedBy,
                                priority: priority
                            }).catch(function (err) {
                                logger_1.default.info("Creating todo error", err);
                                throw new AppError_1.default(400, "Todo name already exist");
                            })];
                    case 1:
                        todo = _b.sent();
                        return [2 /*return*/, res.status(httpStatus.CREATED).send({
                                message: "Todo successfully created",
                                status: "created",
                                status_code: httpStatus.CREATED,
                                results: todo,
                            })];
                    case 2:
                        err_1 = _b.sent();
                        next(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * View a Todo
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    TodoController.viewTodo = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var todo_id, postedBy, todo, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        todo_id = req.params.todo_id;
                        postedBy = req.id;
                        return [4 /*yield*/, Todo_1.default.findOne({ _id: todo_id, postedBy: postedBy })];
                    case 1:
                        todo = _a.sent();
                        if (!todo)
                            throw new AppError_1.default(httpStatus.NOT_FOUND, "Todo not found");
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully  fetched todo",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: todo
                            })];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * View all Todo
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    TodoController.allTodo = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, perPage, postedBy, todos, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, page = _a.page, perPage = _a.perPage;
                        postedBy = req.id;
                        perPage = perPage ? parseInt(perPage, 10) : 10;
                        page = page ? parseInt(page, 10) : 1;
                        return [4 /*yield*/, Todo_1.default.find({
                                postedBy: postedBy
                            })
                                .skip((page - 1) * perPage)
                                .limit(perPage)
                                .sort({ createdAt: -1 })
                                .exec()];
                    case 1:
                        todos = _b.sent();
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully  fetched all todos",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: {
                                    todos: todos,
                                    __meta: {
                                        page: page, perPage: perPage
                                    }
                                },
                            })];
                    case 2:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Search todos
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    TodoController.search = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, q, page, perPage, todos, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.query, q = _a.q, page = _a.page, perPage = _a.perPage;
                        todos = void 0;
                        if (!!q) return [3 /*break*/, 2];
                        return [4 /*yield*/, Todo_1.default.find()];
                    case 1:
                        todos = _b.sent();
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully  fetched search results",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: {
                                    todos: todos,
                                    __meta: {
                                        count: todos.length,
                                        page: page,
                                        perPage: perPage,
                                    },
                                },
                            })];
                    case 2:
                        perPage = perPage ? parseInt(perPage, 10) : 10;
                        page = page ? parseInt(page, 10) : 1;
                        return [4 /*yield*/, Todo_1.default.find({
                                $text: {
                                    $search: q,
                                },
                            }, {
                                score: { $meta: "textScore" },
                            })
                                .skip((page - 1) * perPage)
                                .limit(perPage)
                                .sort({ createdAt: -1 })
                                .exec()];
                    case 3:
                        todos = _b.sent();
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully  fetched search results",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: {
                                    todos: todos,
                                    __meta: {
                                        count: todos.length,
                                        page: page,
                                        perPage: perPage,
                                    },
                                },
                            })];
                    case 4:
                        error_3 = _b.sent();
                        console.log(error_3);
                        return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                message: "Internal Server Error",
                                status: "Internal Server Error",
                                status_code: httpStatus.INTERNAL_SERVER_ERROR,
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Edit a Todo
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    TodoController.editTodo = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var postedBy, todo_id, existingTodo, options, todo, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        postedBy = req.id;
                        todo_id = req.params.todo_id;
                        return [4 /*yield*/, Todo_1.default.findOne({ _id: todo_id })
                                .catch(function (err) {
                                if (err.name === "CastError") {
                                    throw new AppError_1.default(httpStatus.NOT_FOUND, "Todo not Found");
                                }
                            })];
                    case 1:
                        existingTodo = _a.sent();
                        if (existingTodo == null) {
                            throw new AppError_1.default(httpStatus.NOT_FOUND, "Todo not Found");
                        }
                        options = {
                            // Return the document after updates are applied
                            new: true,
                            // Create a document if one isn't found. Required for `setDefaultsOnInsert`
                            upsert: true,
                            useFindAndModify: true,
                            setDefaultsOnInsert: true
                        };
                        return [4 /*yield*/, Todo_1.default.findOneAndUpdate({
                                _id: todo_id,
                                postedBy: postedBy
                            }, __assign(__assign({}, req.body), { modifiedAt: new Date() }), options).catch(function (err) {
                                if (err.name === "MongoError") {
                                    throw new AppError_1.default(httpStatus.CONFLICT, "Todo Name Already Exist");
                                }
                            })];
                    case 2:
                        todo = _a.sent();
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully updated the todo",
                                status: "ok",
                                status_code: httpStatus.OK,
                                result: todo
                            })];
                    case 3:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete a Todo
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    TodoController.deleteTodo = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var todo_id, postedBy, existingTodo, todo, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        todo_id = req.params.todo_id;
                        postedBy = req.id;
                        return [4 /*yield*/, Todo_1.default.findOne({ _id: todo_id })
                                .catch(function (err) {
                                if (err.name === "CastError") {
                                    throw new AppError_1.default(httpStatus.NOT_FOUND, "Todo not Found");
                                }
                            })];
                    case 1:
                        existingTodo = _a.sent();
                        if (existingTodo == null) {
                            throw new AppError_1.default(httpStatus.NOT_FOUND, "Todo not Found");
                        }
                        return [4 /*yield*/, Todo_1.default.findByIdAndDelete({ _id: todo_id, postedBy: postedBy }).catch(function (err) {
                                if (err.name === "CastError") {
                                    throw new AppError_1.default(httpStatus.NOT_FOUND, "Todo not Found");
                                }
                            })];
                    case 2:
                        todo = _a.sent();
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully deleted the todo",
                                status: "ok",
                                status_code: httpStatus.OK,
                            })];
                    case 3:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TodoController;
}());
exports.default = TodoController;
//# sourceMappingURL=todo.controller.js.map