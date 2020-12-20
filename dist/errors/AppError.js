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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An error class specific to an API
 */
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    /**
     * @param { number } statusCode - The status code of an API response
     * @param { string } message - An error message to be returned by the API
     */
    function AppError(statusCode, message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'App Error';
        _this.statusCode = statusCode;
        return _this;
    }
    return AppError;
}(Error));
exports.default = AppError;
//# sourceMappingURL=AppError.js.map