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
var Team_1 = __importDefault(require("../models/Team"));
var httpStatus = __importStar(require("http-status"));
var logger_1 = __importDefault(require("../logger"));
var TeamController = /** @class */ (function () {
    function TeamController() {
    }
    /**
     * Create a team in the database
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    TeamController.createTeam = function (req, res, next) {
        try {
            var _a = req.body, teamName = _a.teamName, members = _a.members, description = _a.description, location_1 = _a.location;
            Team_1.default.create({
                teamName: teamName,
                members: members,
                location: location_1,
                description: description,
            })
                .then(function (team) {
                logger_1.default.info("Admin Account asuccessfully created");
                return res.status(httpStatus.CREATED).send({
                    message: "Team successfully created",
                    status: "created",
                    status_code: httpStatus.CREATED,
                    results: team,
                });
            })
                .catch(function (err) {
                if (err.name === "ValidationError") {
                    return res.status(httpStatus.BAD_REQUEST).send({
                        message: err.message,
                        status: "bad request",
                        status_code: httpStatus.BAD_REQUEST,
                    });
                }
                if (err.name === "MongoError") {
                    return res.status(httpStatus.CONFLICT).send({
                        message: "Team already exist",
                        status: "conflict",
                        status_code: httpStatus.CONFLICT,
                    });
                }
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
     * View a Team
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    TeamController.viewTeam = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var team_id;
            return __generator(this, function (_a) {
                try {
                    team_id = req.params.team_id;
                    Team_1.default.findOne({ _id: team_id })
                        .then(function (team) {
                        if (!team)
                            return res.status(httpStatus.BAD_REQUEST).send({
                                message: "Team not found",
                                status: "bad request",
                                status_code: httpStatus.BAD_REQUEST,
                            });
                        return res.status(httpStatus.OK).send({
                            message: "Successfully  fetched the team",
                            status: "ok",
                            status_code: httpStatus.OK,
                            results: team,
                        });
                    })
                        .catch(function (err) {
                        return res.status(httpStatus.BAD_REQUEST).send({
                            message: "Team not found",
                            status: "bad request",
                            status_code: httpStatus.BAD_REQUEST,
                        });
                    });
                }
                catch (error) {
                    console.log(error);
                    return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                            message: "Internal Server Error",
                            status: "Internal Server Error",
                            status_code: httpStatus.INTERNAL_SERVER_ERROR,
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * View all Team
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    TeamController.allTeam = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, perPage, teams, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, page = _a.page, perPage = _a.perPage;
                        perPage = perPage ? parseInt(perPage, 10) : 10;
                        page = page ? parseInt(page, 10) : 1;
                        return [4 /*yield*/, Team_1.default.find()
                                .skip((page - 1) * perPage)
                                .limit(perPage)
                                .sort({ createdAt: -1 })
                                .exec()];
                    case 1:
                        teams = _b.sent();
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully  fetched all teams",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: teams,
                            })];
                    case 2:
                        error_1 = _b.sent();
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
     * Search teams
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    TeamController.search = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, q, page, perPage, teams, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.query, q = _a.q, page = _a.page, perPage = _a.perPage;
                        perPage = perPage ? parseInt(perPage, 10) : 10;
                        page = page ? parseInt(page, 10) : 1;
                        return [4 /*yield*/, Team_1.default.find({
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
                        teams = _b.sent();
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully  fetched search results",
                                status: "ok",
                                status_code: httpStatus.OK,
                                results: {
                                    teams: teams,
                                    __meta: {
                                        count: teams.length,
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
     * Edit a Team
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    TeamController.editTeam = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var team_id, options;
            return __generator(this, function (_a) {
                try {
                    team_id = req.params.team_id;
                    options = {
                        // Return the document after updates are applied
                        new: true,
                        // Create a document if one isn't found. Required for `setDefaultsOnInsert`
                        upsert: true,
                        setDefaultsOnInsert: true,
                        useFindAndModify: false,
                    };
                    Team_1.default.findOneAndUpdate({
                        _id: team_id,
                    }, __assign(__assign({}, req.body), { modifiedAt: new Date() }), options)
                        .then(function (team) {
                        return res.status(httpStatus.OK).send({
                            message: "Successfully updated the team",
                            status: "ok",
                            status_code: httpStatus.OK,
                            results: team,
                        });
                    })
                        .catch(function (err) {
                        console.log(err);
                        return res.status(httpStatus.BAD_REQUEST).send({
                            message: "Team not found",
                            status: "bad request",
                            status_code: httpStatus.BAD_REQUEST,
                        });
                    });
                }
                catch (error) {
                    return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                            message: "Internal Server Error",
                            status: "Internal Server Error",
                            status_code: httpStatus.INTERNAL_SERVER_ERROR,
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Delete a Team
     * @param {Object} req: url params
     * @param {Function} res: Express.js response callback
     * @param {Function} next: Express.js middleware callback
     * @author Emmanuel Ogbiyoyo
     * @public
     */
    TeamController.deleteTeam = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var team_id, team, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        team_id = req.params.team_id;
                        return [4 /*yield*/, Team_1.default.findByIdAndDelete({ _id: team_id }).exec()];
                    case 1:
                        team = _a.sent();
                        if (!team) {
                            return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send({
                                    message: "Team not found",
                                    status: "bad request",
                                    status_code: httpStatus.BAD_REQUEST,
                                })];
                        }
                        return [2 /*return*/, res.status(httpStatus.OK).send({
                                message: "Successfully deleted the team",
                                status: "ok",
                                status_code: httpStatus.OK,
                            })];
                    case 2:
                        error_3 = _a.sent();
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
    return TeamController;
}());
exports.default = TeamController;
//# sourceMappingURL=team.controller.js.map