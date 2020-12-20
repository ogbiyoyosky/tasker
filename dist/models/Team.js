"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamSchema = void 0;
var mongoose_1 = require("mongoose");
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
exports.TeamSchema = new mongoose_1.Schema({
    teamName: {
        type: String,
        required: "Team Name is required",
        unique: true,
    },
    location: {
        type: String,
        required: "Team Name is required",
    },
    members: {
        name: {
            type: String,
            lowercase: true,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        type: Array,
    },
    description: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    modifiedAt: {
        type: Date,
        default: new Date(),
    },
    deletedAt: {
        type: Date,
        default: null,
    },
});
exports.TeamSchema.plugin(mongoose_unique_validator_1.default);
exports.TeamSchema.index({
    teamName: "text",
    location: "text",
    "members.name": "text",
    "members.position": "text",
    description: "text",
    status: "text",
}, {
    name: "searchIndex",
});
var TeamModel = mongoose_1.model("Team", exports.TeamSchema);
TeamModel.on("index", function (err) {
    if (err) {
        console.log("ERROR", err);
    }
});
// TeamModel.collection.dropIndexes((err, r) => {
//   console.log(r);
// });
TeamModel.ensureIndexes();
exports.default = TeamModel;
//# sourceMappingURL=Team.js.map