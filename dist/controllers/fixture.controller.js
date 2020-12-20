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
var Fixture_1 = __importDefault(require("../models/Fixture"));
var httpStatus = __importStar(require("http-status"));
var logger_1 = __importDefault(require("../logger"));
var uuidv4_1 = require("uuidv4");
var FixtureController = /** @class */ (function () {
    function FixtureController() {
    }
    /**
     * Add a fixture.
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    FixtureController.addFixture = function (req, res, next) {
        try {
            var _a = req.body, homeTeam = _a.homeTeam, awayTeam = _a.awayTeam, details = _a.details;
            Fixture_1.default.create({
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                details: details,
            })
                .then(function (fixture) {
                return res.status(httpStatus.CREATED).send({
                    message: "Fixture successfully created",
                    status: "created",
                    status_code: httpStatus.CREATED,
                    results: fixture,
                });
            })
                .catch(function (err) {
                console.log(err);
                logger_1.default.info(err);
            });
        }
        catch (err) {
            logger_1.default.info("Internal server error", err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Internal Server Error",
                status: "Internal Server Error",
                status_code: httpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    };
    /**
     * View a Fixture
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    FixtureController.viewFixture = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var fixture_id, fixture, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        fixture_id = req.params.fixture_id;
                        return [4 /*yield*/, Fixture_1.default.findById({ _id: fixture_id }).exec()];
                    case 1:
                        fixture = _a.sent();
                        if (!fixture)
                            return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send({
                                    message: "Fixture not found",
                                    status: "bad request",
                                    status_code: httpStatus.BAD_REQUEST,
                                })];
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully fetched the fixture",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: [fixture],
                            })];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                message: "Internal Server Error",
                                status: "Internal Server Error",
                                status_code: httpStatus.INTERNAL_SERVER_ERROR,
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Search fixtures
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    FixtureController.search = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, q, page, perPage, fixtures, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, q = _a.q, page = _a.page, perPage = _a.perPage;
                        //await FixtureModel.deleteMany({});
                        perPage = perPage ? parseInt(perPage, 10) : 10;
                        page = page ? parseInt(page, 10) : 1;
                        return [4 /*yield*/, Fixture_1.default.find({
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
                    case 1:
                        fixtures = _b.sent();
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully  fetched search results",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: {
                                    fixtures: fixtures,
                                    __meta: {
                                        count: fixtures.length,
                                        page: page,
                                        perPage: perPage,
                                    },
                                },
                            })];
                    case 2:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                message: "Internal Server Error",
                                status: "Internal Server Error",
                                status_code: httpStatus.INTERNAL_SERVER_ERROR,
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Edit a Fixture
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    FixtureController.editFixture = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var fixture_id, options, fixture, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        fixture_id = req.params.fixture_id;
                        options = {
                            // Return the document after updates are applied
                            new: true,
                            // Create a document if one isn't found. Required for `setDefaultsOnInsert`
                            upsert: true,
                            setDefaultsOnInsert: true,
                            useFindAndModify: false,
                        };
                        return [4 /*yield*/, Fixture_1.default.findByIdAndUpdate({ _id: fixture_id }, {
                                $set: __assign(__assign({}, req.body), { modifiedAt: new Date() }),
                            }, options).exec()];
                    case 1:
                        fixture = _a.sent();
                        if (!fixture) {
                            return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send({
                                    message: "Fixture not found",
                                    status: "bad request",
                                    status_code: httpStatus.BAD_REQUEST,
                                })];
                        }
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully  updated the Fixture",
                                status: "ok",
                                status_code: httpStatus.OK,
                            })];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                message: "Internal Server Error",
                                status: "Internal Server Error",
                                status_code: httpStatus.INTERNAL_SERVER_ERROR,
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * View all Completed Fixture
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    FixtureController.completedFixture = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, perPage, fixture, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, page = _a.page, perPage = _a.perPage;
                        perPage = perPage ? parseInt(perPage, 10) : 10;
                        page = page ? parseInt(page, 10) : 1;
                        return [4 /*yield*/, Fixture_1.default.find({ status: "completed" })
                                .skip((page - 1) * perPage)
                                .limit(perPage)
                                .sort({ createdAt: -1 })
                                .exec()];
                    case 1:
                        fixture = _b.sent();
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully  fetched all completed fixture",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: fixture,
                            })];
                    case 2:
                        error_4 = _b.sent();
                        console.log(error_4);
                        return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                message: "Internal Server Error",
                                status: "Internal Server Error",
                                status_code: httpStatus.INTERNAL_SERVER_ERROR,
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * View all Completed Fixture
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    FixtureController.pendingFixture = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, perPage, fixtures, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, page = _a.page, perPage = _a.perPage;
                        perPage = perPage ? parseInt(perPage, 10) : 10;
                        page = page ? parseInt(page, 10) : 1;
                        return [4 /*yield*/, Fixture_1.default.find({ status: "pending" })
                                .skip((page - 1) * perPage)
                                .limit(perPage)
                                .sort({ createdAt: -1 })
                                .exec()];
                    case 1:
                        fixtures = _b.sent();
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully  fetched all pending fixture",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: fixtures,
                            })];
                    case 2:
                        error_5 = _b.sent();
                        console.log(error_5);
                        return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                message: "Internal Server Error",
                                status: "Internal Server Error",
                                status_code: httpStatus.INTERNAL_SERVER_ERROR,
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * View all Fixtures
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    FixtureController.allFixtures = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, perPage, teams, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, page = _a.page, perPage = _a.perPage;
                        perPage = perPage ? parseInt(perPage, 10) : 10;
                        page = page ? parseInt(page, 10) : 1;
                        return [4 /*yield*/, Fixture_1.default.find()
                                .skip((page - 1) * perPage)
                                .limit(perPage)
                                .sort({ createdAt: -1 })
                                .exec()];
                    case 1:
                        teams = _b.sent();
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully  fetched all fixtures",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: teams,
                            })];
                    case 2:
                        error_6 = _b.sent();
                        console.log(error_6);
                        return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                message: "Internal Server Error",
                                status: "Internal Server Error",
                                status_code: httpStatus.INTERNAL_SERVER_ERROR,
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete a Fixture
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    FixtureController.deleteFixture = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var fixture_id, fixture, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        fixture_id = req.params.fixture_id;
                        return [4 /*yield*/, Fixture_1.default.findByIdAndDelete({
                                _id: fixture_id,
                            }).exec()];
                    case 1:
                        fixture = _a.sent();
                        if (!fixture) {
                            return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send({
                                    message: "Fixture not found",
                                    status: "bad request",
                                    status_code: httpStatus.BAD_REQUEST,
                                })];
                        }
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully deleted the fixture",
                                status: "ok",
                                status_code: httpStatus.OK,
                            })];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                message: "Internal Server Error",
                                status: "Internal Server Error",
                                status_code: httpStatus.INTERNAL_SERVER_ERROR,
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generate a unique link for the fixture
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    FixtureController.generateLink = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var fixture_id, link, options, fixture, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        fixture_id = req.params.fixture_id;
                        link = uuidv4_1.uuid();
                        options = {
                            // Return the document after updates are applied
                            new: true,
                            // Create a document if one isn't found. Required for `setDefaultsOnInsert`
                            upsert: true,
                            setDefaultsOnInsert: true,
                            useFindAndModify: false,
                        };
                        return [4 /*yield*/, Fixture_1.default.findByIdAndUpdate({ _id: fixture_id }, {
                                $set: {
                                    generatedLink: link,
                                    modifiedAt: new Date(),
                                },
                            }, options).exec()];
                    case 1:
                        fixture = _a.sent();
                        if (!fixture) {
                            return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send({
                                    message: "Fixture not found",
                                    status: "bad request",
                                    status_code: httpStatus.BAD_REQUEST,
                                })];
                        }
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully generated a unique link for the fixture fixture",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: [
                                    {
                                        fixture_link: process.env.BASE_URL + "/api/fixtures/link/" + link,
                                        fixture: fixture,
                                    },
                                ],
                            })];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                message: "Internal Server Error",
                                status: "Internal Server Error",
                                status_code: httpStatus.INTERNAL_SERVER_ERROR,
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * View fixture by generated link
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    FixtureController.getFixtureByLink = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var unique_code, fixture, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        unique_code = req.params.unique_code;
                        return [4 /*yield*/, Fixture_1.default.find({
                                generatedLink: unique_code,
                            }).exec()];
                    case 1:
                        fixture = _a.sent();
                        if (!fixture.length)
                            return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send({
                                    message: "Fixture not found",
                                    status: "bad request",
                                    status_code: httpStatus.BAD_REQUEST,
                                })];
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully fetched the fixture",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: fixture,
                            })];
                    case 2:
                        error_9 = _a.sent();
                        console.log(error_9);
                        return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                                message: "Internal Server Error",
                                status: "Internal Server Error",
                                status_code: httpStatus.INTERNAL_SERVER_ERROR,
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FixtureController;
}());
exports.default = FixtureController;
//# sourceMappingURL=fixture.controller.js.map