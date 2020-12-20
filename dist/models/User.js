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
exports.passwordMethod = exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
var bcrypt = __importStar(require("bcrypt-nodejs"));
var SALT_WORK_FACTOR = 10;
var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
exports.UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: "First Name is required",
    },
    lastName: {
        type: String,
        required: "Last Name is required",
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    password: {
        type: String,
        required: "Please enter a password",
        min: "Password should be at least 6 characters",
    },
    role: {
        type: String,
        required: true,
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
});
exports.UserSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password"))
        return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
/**
 * method to comparePassword.
 * @public
 */
exports.passwordMethod = (exports.UserSchema.methods = {
    comparePassword: function (pw, cb) {
        bcrypt.compare(pw, this.password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    },
});
exports.UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};
var UserModel = mongoose_1.model("User", exports.UserSchema);
exports.default = UserModel;
//# sourceMappingURL=User.js.map