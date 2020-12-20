"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = __importDefault(require("./AppError"));
/**
 * A error class for managing authentication errors with a 401
 * status code
 */
var AuthenticationError = /** @class */ (function (_super) {
    __extends(AuthenticationError, _super);
    /**
     * @param { string } message - An error message
     */
    function AuthenticationError(message) {
        if (message === void 0) { message = 'Please sign in or create an account'; }
        var _this = _super.call(this, 401, message) || this;
        _this.name = 'Authentication Error';
        return _this;
    }
    return AuthenticationError;
}(AppError_1.default));
exports.default = AuthenticationError;
//# sourceMappingURL=AuthenticationError.js.map