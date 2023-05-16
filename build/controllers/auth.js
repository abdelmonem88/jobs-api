"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const User_1 = __importDefault(require("../models/User"));
const register = async (req, res) => {
    const { name } = req.body;
    const user = await User_1.default.create({ ...req.body });
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ user: { name }, token: user.generateToken() });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide an email and password");
    }
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError("Invalid Credentials");
    }
    const isMatchPassword = await user.comparePassword(password);
    console.log(isMatchPassword);
    if (!isMatchPassword) {
        throw new errors_1.UnauthenticatedError("Invalid Credentials");
    }
    const token = user.generateToken();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        user: {
            name: user.name,
        },
        token,
    });
};
exports.login = login;
//# sourceMappingURL=auth.js.map