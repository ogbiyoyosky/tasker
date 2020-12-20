"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker = require("faker");
var mongoose = require("mongoose");
var _ = require("lodash");
var User_1 = __importDefault(require("../models/User"));
var Team_1 = __importDefault(require("../models/Team"));
var Fixture_1 = __importDefault(require("../models/Fixture"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var client = {
    connect: function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                mongoose.connect(process.env.NODE_ENV == "test"
                    ? process.env.TEST_MONGO_URI
                    : process.env.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                });
                console.log("Connected to the database!!!");
            }
            catch (error) {
                throw error;
            }
            return [2 /*return*/];
        });
    }); },
    disconnect: function () { return mongoose.disconnect(); },
};
(function clear() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Fixture_1.default.deleteMany({})];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, User_1.default.deleteMany({})];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, Team_1.default.deleteMany({})];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
})();
function seedUser(randomSeed, numData) {
    var _this = this;
    faker.seed(randomSeed);
    return Promise.all(__spreadArrays(Array(numData)).map(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.create([
                        {
                            firstName: faker.name.findName(),
                            email: faker.internet.email(),
                            lastName: faker.name.findName(),
                            password: "123456",
                            role: "ADMIN",
                        },
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }));
}
function seedFixture() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Fixture_1.default.create([
                        {
                            homeTeam: [{ name: "Arsenal", score: 0 }],
                            awayTeam: [{ name: "Chelsea", score: 0 }],
                            status: "completed",
                            details: [
                                { date: "2019-11-25T16:24:32.674+00:00" },
                                { stadium: "Craven Cottage" },
                            ],
                        },
                        {
                            homeTeam: [{ name: "Brighton and Hove Albion", score: 0 }],
                            awayTeam: [{ name: "Aston Villa", score: 0 }],
                            status: "pending",
                            details: [
                                { date: "2019-11-09T16:24:32.674+00:00" },
                                { stadium: "Vitality Stadium" },
                            ],
                        },
                        {
                            homeTeam: [{ name: "Aston Villa", score: 0 }],
                            awayTeam: [{ name: "AFC Bournemouth", score: 0 }],
                            status: "completed",
                            details: [
                                { date: "2019-11-01T16:24:32.674+00:00" },
                                { stadium: "King Power Stadium" },
                            ],
                        },
                        {
                            homeTeam: [{ name: "Arsenal", score: 0 }],
                            awayTeam: [{ name: "AFC Bournemouth", score: 0 }],
                            status: "pending",
                            details: [
                                { date: "2019-11-04T16:24:32.674+00:00" },
                                { stadium: "Vicarage Road" },
                            ],
                        },
                        {
                            homeTeam: [{ name: "Aston Villa", score: 0 }],
                            awayTeam: [{ name: "Chelsea", score: 0 }],
                            status: "completed",
                            details: [
                                { date: "2019-11-26T16:24:32.674+00:00" },
                                { stadium: "Craven Cottage" },
                            ],
                        },
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function seedTeams() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Team_1.default.create([
                        {
                            teamName: "Arsenal",
                            location: "England",
                            description: "Gunners",
                            members: [
                                { name: "Sead Kolasinac", position: "Defender" },
                                { name: "Calum Chambers", position: "Defender" },
                                { name: "Kieran Tierney", position: "Defender" },
                                { name: "David Luiz", position: "Defender" },
                                { name: "Tolaji Bola", position: "Defender" },
                                { name: "Mesut Ozil", position: "Midfielder" },
                                { name: "Lucas Torreira", position: "Midfielder" },
                                { name: "Ainsley Maitland-Niles", position: "Midfielder" },
                                { name: "Matteo Guendouzi", position: "Midfielder" },
                                { name: "Granit Xhaka", position: "Midfielder" },
                                { name: "Joe Willock", position: "Midfielder" },
                                { name: "Emile Smith Rowe", position: "Midfielder" },
                                { name: "Gabriel Martinelli", position: "Midfielder" },
                                { name: "Dani Ceballos", position: "Midfielder" },
                                { name: "Robbie Burton", position: "Midfielder" },
                                { name: "Alexandre Locazatte", position: "Forward" },
                                { name: "Pierre-Emerick Aubameyang", position: "Forward" },
                                { name: "Reiss Nelson", position: "Forward" },
                                { name: "Nicolas Pepe", position: "Forward" },
                                { name: "Bukayo Saka", position: "Forward" },
                                { name: "Folarin Balogun", position: "Forward" },
                            ],
                        },
                        {
                            teamName: "Aston Villa",
                            location: "England",
                            description: "Astons",
                            members: [
                                { name: "Orjan Nyland", position: "Gaol Keeper" },
                                { name: "Jed Steer", position: "Gaol Keeper" },
                                { name: "Lovre Kalinic", position: "Gaol Keeper" },
                                { name: "Tom Heaton", position: "Defender" },
                                { name: "Neil Taylor", position: "Defender" },
                                { name: "James Chester", position: "Defender" },
                                { name: "Ahmed El Mohamady", position: "Defender" },
                                { name: "Frederic", position: "Defender" },
                                { name: "Matt Targett", position: "Defender" },
                                { name: "Kortney Hause", position: "Defender" },
                                { name: "Tyrone Mings", position: "Defender" },
                                { name: "Ezri Kansa Ngoyo", position: "Defender" },
                                { name: "Bjorn Engels", position: "Defender" },
                                { name: "John McGinn", position: "Midfielder" },
                                { name: "Henri Lansbury", position: "Midfielder" },
                                { name: "Jack Grealish", position: "Midfielder" },
                                { name: "Conor Hourihane", position: "Midfielder" },
                                { name: "Keinan Davis", position: "Midfielder" },
                                { name: "Jota", position: "Midfielder" },
                                { name: "Anwar El Ghazi", position: "Midfielder" },
                                { name: "Trezeguet", position: "Midfielder" },
                                { name: "Douglas Luiz", position: "Midfielder" },
                                { name: "Marvelous Nakamba", position: "Midfielder" },
                                { name: "Jacob Ramsey", position: "Midfielder" },
                                { name: "Jonathan Kodija", position: "Forward" },
                                { name: "Wesley", position: "Forward" },
                                { name: "Cameron Archer", position: "Forward" },
                            ],
                        },
                        {
                            teamName: "AFC Bournemouth",
                            location: "England",
                            description: "Bournemouth city",
                            members: [
                                { name: "Artur Boruc", position: "Gaol Keeper" },
                                { name: "Mark Travers", position: "Gaol Keeper" },
                                { name: "Aaron Ramsdale", position: "Gaol Keeper" },
                                { name: "William Dennis", position: "Gaol Keeper" },
                                { name: "Simon Francis", position: "Defender" },
                                { name: "Steve Cook", position: "Defender" },
                                { name: "Nathan Ake", position: "Defender" },
                                { name: "Charlie Daniels", position: "Defender" },
                                { name: "Adam Smith", position: "Defender" },
                                { name: "Diego Rico", position: "Defender" },
                                { name: "Jack Simpson", position: "Defender" },
                                { name: "Chris Mepham", position: "Defender" },
                                { name: "Lloyd Kelly", position: "Defender" },
                                { name: "Brad Smith", position: "Defender" },
                                { name: "Jack Stacey", position: "Defender" },
                                { name: "Jordan Zemura", position: "Midfielder" },
                                { name: "Brennan Camp", position: "Defender" },
                                { name: "Corey Jordan", position: "Defender" },
                                { name: "Dan Gosling", position: "Midfielder" },
                                { name: "Andrew Surman", position: "Midfielder" },
                                { name: "David Brooks", position: "Midfielder" },
                                { name: "Ryan Fraser", position: "Midfielder" },
                                { name: "Matt Butcher", position: "Midfielder" },
                                { name: "Mihai-Alexandru Dobre", position: "Midfielder" },
                                { name: "Philip Billing", position: "Midfielder" },
                                { name: "Harry Wilson", position: "Midfielder" },
                                { name: "Gravin Kilkenny", position: "Midfielder" },
                                { name: "Philip Billing", position: "Midfielder" },
                                { name: "Callum Wilson", position: "Forward" },
                                { name: "Joshua King", position: "Forward" },
                                { name: "Dominic Solanke", position: "Forward" },
                                { name: "Arnaut Danjuma", position: "Forward" },
                            ],
                        },
                        {
                            teamName: "Brighton & Hove Albion",
                            location: "England",
                            description: "Brighton",
                            members: [
                                { name: "David Button", position: "Gaol Keeper" },
                                { name: "Robert Sánchez", position: "Gaol Keeper" },
                                { name: "Mathew Ryan", position: "Gaol Keeper" },
                                { name: "Jason Steele", position: "Gaol Keeper" },
                                { name: "Leon Balogun", position: "Defender" },
                                { name: "Bernardo", position: "Defender" },
                                { name: "Gaëtan Bong", position: "Defender" },
                                { name: "Bruno", position: "Defender" },
                                { name: "Dan Burn", position: "Defender" },
                                { name: "Shane Duffy", position: "Defender" },
                                { name: "Lewis Dunk", position: "Defender" },
                                { name: "Martín Montoya", position: "Defender" },
                                { name: "Leo Østigård", position: "Defender" },
                                { name: "Yves Bissouma", position: "Midfielder" },
                                { name: "Will Collar", position: "Midfielder" },
                                { name: "Pascal Groß", position: "Midfielder" },
                                { name: "Biram Kayal", position: "Midfielder" },
                                { name: "Anthony Knockaert", position: "Midfielder" },
                                { name: "Solomon March", position: "Midfielder" },
                                { name: "Jayson Molumby", position: "Midfielder" },
                                { name: "Davy Pröpper", position: "Midfielder" },
                                { name: "Max Sanders", position: "Midfielder" },
                                { name: "Dale Stephens", position: "Midfielder" },
                                { name: "Viktor Gyökeres", position: "Forward" },
                                { name: "José Izquierdo", position: "Forward" },
                                { name: "Alireza Jahanbakhsh", position: "Forward" },
                                { name: "Jürgen Locadia", position: "Forward" },
                                { name: "Glenn Murray", position: "Forward" },
                                { name: "Ben Roberts", position: "Coach" },
                                { name: "Paul Trollope", position: "Assistance Manager" },
                            ],
                        },
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function runProgram() {
    return client
        .connect()
        .then(function () { return seedUser(12379880900, 5); })
        .then(function () { return seedTeams(); })
        .then(function () { return seedFixture(); })
        .then(function () { return client.disconnect(); });
}
runProgram().then(function () {
    console.log("Completed");
}, function (err) {
    console.log(err);
});
//# sourceMappingURL=seeds.js.map