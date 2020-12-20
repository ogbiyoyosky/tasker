"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var TodoSchema = new mongoose_1.Schema({
    todoName: {
        type: String,
        required: "Todo Name is required",
    },
    description: {
        type: String,
        required: "description is required",
    },
    priority: {
        type: String,
        enum: [
            "high",
            "low",
            "meduim"
        ]
    },
    postedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: Boolean,
        default: false
    },
    startTime: {
        type: Date,
        required: "StartTime is required",
    },
    endTime: {
        type: Date,
        required: " endTime is required",
    }
}, {
    emitIndexErrors: true,
    autoIndex: true,
});
TodoSchema.index({
    todoName: "text",
    priority: "text",
}, {
    name: "searchIndex",
});
var TodoModel = mongoose_1.model("Todo", TodoSchema);
TodoModel.on("index", function (err) {
    if (err) {
        console.log("ERROR", err);
    }
});
TodoModel.ensureIndexes();
exports.default = TodoModel;
//# sourceMappingURL=Todo.js.map