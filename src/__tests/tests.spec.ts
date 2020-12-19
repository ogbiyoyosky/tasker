import auth from "./auth.spartial";
import todo from "./todo.spartial";
import UserModel from "../models/User";
import TodoModel from "../models/Todo";

(async function () {
  console.log("clearingusers table");
  await UserModel.deleteMany({});
  await TodoModel.deleteMany({});
})();

auth();
todo();
