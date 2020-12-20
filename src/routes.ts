import { Router } from "express";

import UserController from "./controllers/user.controller";
import AuthController from "./controllers/auth.controller";
import TodoController from "./controllers/todo.controller";
import validate from "./middleware/validators/validate";
import verifyToken from "./middleware/auth/token.middleware";
import permissions from "./middleware/auth/role.middleware";

const router = Router();

router.get("/welcome", (req, res) => {
  return res.status(200).send({
    message: "welcome to todo api",
  });
});

router.get("/", (req, res) => {
  return res.status(200).send({
    message: "welcome to todo api",
  });
});

/**
 * @register - register a user
 */
router.post(
  "/api/auth/register",
  validate.validateBody(validate.schemas.authSchema),
  UserController.createUserAccount
);
/**
 * @sigin - sign in a user
 */
router.post(
  "/api/auth/signin",
  validate.validateBody(validate.schemas.authLoginSchema),
  AuthController.authenticate
);

/**
 * @logout
 */
router.post("/api/auth/logout", AuthController.logout);

/**
 * @adminRegister
 */
router.post(
  "/api/auth/admin/register",
  validate.validateBody(validate.schemas.authSchema),
  UserController.createAdminAccount
);

/**
 * @createTodo
 */
router.post(
  "/api/todos",
  verifyToken.verify,
  validate.validateBody(validate.schemas.createTodoSchema),
  TodoController.createTodo
);

/**
 * @searchTeam
 */
// router.get("/api/teams/search", TeamController.search);

/**
 * @fetchTodos
 */
router.get("/api/todos", verifyToken.verify, TodoController.allTodo);

// /**
//  * @viewSignTeam
//  */
// router.get("/api/teams/:team_id", verifyToken.verify, TeamController.viewTeam);

/**
 * @editTodo
 */
router.put(
  "/api/todos/:todo_id",
  verifyToken.verify,
  validate.validateBody(validate.schemas.editTodoSchema),
  TodoController.editTodo
);

/**
 * @deleteTodo
 */
router.delete(
  "/api/todos/:todo_id",
  verifyToken.verify,
  TodoController.deleteTodo
);



/**
 * @searchFixture
 */
router.get("/api/todos/search", TodoController.search);



/**
 * @viewSingleTodo
 */
router.get(
  "/api/todos/:todo_id",
  verifyToken.verify,
  TodoController.viewTodo
);




export default router;
