"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixtureSchema = void 0;
var mongoose_1 = require("mongoose");
var team = {
    ref: "Team",
    type: Array,
    name: {
        type: String,
        enum: [
            "AFC Bournemouth",
            "Arsenal",
            "Aston Villa",
            "Brighton & Hove Albion",
            "Burnley",
            "Chelsea",
            "Crystal Palace",
            "Everton",
            "Leicester City",
            "Liverpool",
            "Manchester City",
            "Manchester United",
            "Newcastle United",
            "Norwich City",
            "Sheffield United",
            "Southampton",
            "Tottenham Hotspur",
            "Watford",
            "West Ham United",
            "Wolverhampton Wanderers",
        ],
    },
    score: { type: Number, default: 0 },
};
exports.FixtureSchema = new mongoose_1.Schema({
    homeTeam: team,
    awayTeam: team,
    details: {
        type: Array,
        matchTime: {
            type: Date,
            default: new Date(),
        },
        staduim: {
            type: String,
            enum: [
                "Vitality Stadium",
                "The Amex",
                "Turf Moor",
                "Cardiff City Stadium",
                "John Smith's Stadium",
                "King Power Stadium",
                "Goodison Park",
                "Anfield",
                "Emirates Stadium",
                "Stamford Bridge",
                "Selhurst Park",
                "Craven Cottage",
                "Wembley Stadium",
                "London Stadium",
                "Etihad Stadium",
                "Old Trafford",
                "St James Park",
                "St Mary's Stadium",
                "Vicarage Road",
                "Molineux Stadium",
            ],
        },
    },
    status: { type: String, default: "pending" },
    generatedLink: {
        type: String,
        default: null,
    },
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
}, {
    emitIndexErrors: true,
    autoIndex: true,
});
exports.FixtureSchema.index({
    "homeTeam.name": "text",
    "awayTeam.name": "text",
    generatedLink: "text",
    "details.matchTime": "text",
    status: "text",
}, {
    name: "searchIndex",
});
var FixtureModel = mongoose_1.model("Fixture", exports.FixtureSchema);
FixtureModel.on("index", function (err) {
    if (err) {
        console.log("ERROR", err);
    }
});
FixtureModel.ensureIndexes();
exports.default = FixtureModel;
//# sourceMappingURL=Fixture.js.map