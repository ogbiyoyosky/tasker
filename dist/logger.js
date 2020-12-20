"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var logTransports = [
    new winston_1.transports.File({
        level: 'error',
        filename: './logs/error.log',
        format: winston_1.format.json({
            replacer: function (key, value) {
                if (key === 'error') {
                    return {
                        message: value.message,
                        stack: value.stack
                    };
                }
                return value;
            }
        })
    }),
    new winston_1.transports.Console({
        level: 'debug',
        format: winston_1.format.prettyPrint()
    })
];
var logger = winston_1.createLogger({
    format: winston_1.format.combine(winston_1.format.timestamp()),
    transports: logTransports,
    defaultMeta: { service: 'api' }
});
exports.default = logger;
//# sourceMappingURL=logger.js.map