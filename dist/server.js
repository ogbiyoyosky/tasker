"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
var dotenv_1 = __importDefault(require("dotenv"));
var result = dotenv_1.default.config();
if (result.error) {
    dotenv_1.default.config({ path: ".env.default" });
}
var app_1 = __importDefault(require("./app"));
app_1.default.listen(app_1.default.get("port"), function () {
    console.log("\x1b[36m%s\x1b[0m", // eslint-disable-line
    "\uD83C\uDF0F Express server started at http://localhost:" + app_1.default.get("port"));
});
//# sourceMappingURL=server.js.map