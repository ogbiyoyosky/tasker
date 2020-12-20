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
 * A error class for managing client-related errors with a 400
 * status code
 */
var ClientError = /** @class */ (function (_super) {
    __extends(ClientError, _super);
    /**
     * @param { string } message - An error message
     */
    function ClientError(message) {
        var _this = _super.call(this, 400, message) || this;
        _this.name = 'Client Error';
        return _this;
    }
    return ClientError;
}(AppError_1.default));
exports.default = ClientError;
//# sourceMappingURL=ClientError.js.map