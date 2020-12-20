"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = __importDefault(require("./controllers/user.controller"));
var auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
var todo_controller_1 = __importDefault(require("./controllers/todo.controller"));
var validate_1 = __importDefault(require("./middleware/validators/validate"));
var token_middleware_1 = __importDefault(require("./middleware/auth/token.middleware"));
var router = express_1.Router();
router.get("/welcome", function (req, res) {
    return res.status(200).send({
        message: "welcome to todo api",
    });
});
router.get("/", function (req, res) {
    return res.status(200).send({
        message: "welcome to todo api",
    });
});
/**
 * @register - register a user
 */
router.post("/api/auth/register", validate_1.default.validateBody(validate_1.default.schemas.authSchema), user_controller_1.default.createUserAccount);
/**
 * @sigin - sign in a user
 */
router.post("/api/auth/signin", validate_1.default.validateBody(validate_1.default.schemas.authLoginSchema), auth_controller_1.default.authenticate);
/**
 * @logout
 */
router.post("/api/auth/logout", auth_controller_1.default.logout);
/**
 * @adminRegister
 */
router.post("/api/auth/admin/register", validate_1.default.validateBody(validate_1.default.schemas.authSchema), user_controller_1.default.createAdminAccount);
/**
 * @createTodo
 */
router.post("/api/todos", token_middleware_1.default.verify, validate_1.default.validateBody(validate_1.default.schemas.createTodoSchema), todo_controller_1.default.createTodo);
/**
 * @searchTeam
 */
// router.get("/api/teams/search", TeamController.search);
/**
 * @fetchTodos
 */
router.get("/api/todos", token_middleware_1.default.verify, todo_controller_1.default.allTodo);
// /**
//  * @viewSignTeam
//  */
// router.get("/api/teams/:team_id", verifyToken.verify, TeamController.viewTeam);
/**
 * @editTodo
 */
router.put("/api/todos/:todo_id", token_middleware_1.default.verify, validate_1.default.validateBody(validate_1.default.schemas.editTodoSchema), todo_controller_1.default.editTodo);
/**
 * @deleteTodo
 */
router.delete("/api/todos/:todo_id", token_middleware_1.default.verify, todo_controller_1.default.deleteTodo);
/**
 * @searchFixture
 */
router.get("/api/todos/search", todo_controller_1.default.search);
/**
 * @viewSingleTodo
 */
router.get("/api/todos/:todo_id", token_middleware_1.default.verify, todo_controller_1.default.viewTodo);
exports.default = router;
//# sourceMappingURL=routes.js.map