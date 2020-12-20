"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
var members = joi_1.default.object().keys({
    name: joi_1.default.string().required().trim().error(new Error("name is required")),
    position: joi_1.default.string()
        .required()
        .trim()
        .error(new Error("position is required")),
});
var validator = {
    validateBody: function (schema) { return function (req, res, next) {
        //logger.info("body", req.body);
        var result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).send({
                status: "bad request",
                statusCode: 400,
                message: result.error.message,
            });
        }
        req.body = result.value;
        return next();
    }; },
    schemas: {
        authSchema: joi_1.default.object().keys({
            firstName: joi_1.default.string()
                .required()
                .trim()
                .lowercase()
                .error(new Error("firstName is required")),
            lastName: joi_1.default.string()
                .required()
                .trim()
                .lowercase()
                .error(new Error("lastName is required")),
            email: joi_1.default.string()
                .email()
                .required()
                .trim()
                .lowercase()
                .error(new Error("A valid email address is required")),
            password: joi_1.default.string()
                .required()
                .error(new Error("Password is required")),
        }),
        authLoginSchema: joi_1.default.object().keys({
            email: joi_1.default.string()
                .required()
                .trim()
                .lowercase()
                .error(new Error("A valid email address is required")),
            password: joi_1.default.string()
                .required()
                .error(new Error("Password is required"))
                .min(6)
                .error(new Error("Password must be a minimum of six characters")),
        }),
        createTodoSchema: joi_1.default.object().keys({
            todoName: joi_1.default.string()
                .required()
                .trim()
                .error(new Error("todoName name is required")),
            description: joi_1.default.string()
                .required()
                .trim()
                .error(new Error("description name is required")),
            priority: joi_1.default.string()
                .required()
                .error(new Error("priority name is required"))
                .valid('high', 'low', 'meduim')
                .error(new Error("Invalid priority"))
                .trim(),
            startTime: joi_1.default.date()
                .required()
                .error(new Error("startTime  is required"))
                .iso().greater(Date.now()).required()
                .error(new Error("startTime  should be greater than the current time")),
            endTime: joi_1.default.date()
                .required()
                .error(new Error("endTime  is required"))
                .iso().greater(joi_1.default.ref('startTime')).required()
                .error(new Error("endTime  should be greater than startTime")),
        }),
        editTodoSchema: joi_1.default.object().keys({
            todoName: joi_1.default.string()
                .required()
                .trim()
                .error(new Error("todoName name is required")),
            status: joi_1.default.boolean()
                .error(new Error("status shouble be a boolean")),
            description: joi_1.default.string()
                .required()
                .trim()
                .error(new Error("description name is required")),
            priority: joi_1.default.string()
                .required()
                .error(new Error("priority name is required"))
                .valid('high', 'low', 'meduim')
                .error(new Error("Invalid priority"))
                .trim(),
            startTime: joi_1.default.date()
                .required()
                .error(new Error("startTime  is required"))
                .iso().greater(Date.now()).required()
                .error(new Error("startTime  should be greater than the current time")),
            endTime: joi_1.default.date()
                .required()
                .error(new Error("endTime  is required"))
                .iso().greater(joi_1.default.ref('startTime')).required()
                .error(new Error("endTime  should be greater than startTime")),
        }),
        createFixtureSchema: joi_1.default.object().keys({
            details: joi_1.default.array().required(),
            homeTeam: joi_1.default.array()
                .required()
                .error(new Error("Home team is required")),
            awayTeam: joi_1.default.array()
                .required()
                .error(new Error("Away team is required")),
            status: joi_1.default.string().trim(),
        }),
        updateScoresSchema: joi_1.default.object().keys({
            homeTeamScore: joi_1.default.number()
                .required()
                .error(new Error("Home score is required")),
            awayTeamScore: joi_1.default.number()
                .required()
                .error(new Error("Away score is required")),
        }),
    },
};
exports.default = validator;
//# sourceMappingURL=validate.js.map