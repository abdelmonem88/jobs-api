"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.createJob = exports.getJob = exports.getJobs = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const Job_1 = __importDefault(require("../models/Job"));
const errors_1 = require("../errors");
const getJobs = async (req, res) => {
    const jobs = await Job_1.default.find({ createdBy: req.user.userId });
    res.status(http_status_codes_1.default.OK).json({ jobs });
};
exports.getJobs = getJobs;
const getJob = async (req, res) => {
    const { id: jobId } = req.params;
    const { userId } = req.user;
    const job = await Job_1.default.findOne({
        _id: jobId,
        createdBy: userId,
    });
    if (!job) {
        throw new errors_1.NotFoundError(`No job with id : ${jobId}`);
    }
    res.status(http_status_codes_1.default.OK).json({ job });
};
exports.getJob = getJob;
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job_1.default.create(req.body);
    res.status(http_status_codes_1.default.CREATED).json({ job });
};
exports.createJob = createJob;
const updateJob = async (req, res) => {
    const { id: jobId } = req.params;
    const { userId } = req.user;
    if (!req.body.company || !req.body.position) {
        throw new errors_1.BadRequestError("Please provide company and position");
    }
    const job = await Job_1.default.findOneAndUpdate({
        _id: jobId,
        createdBy: userId,
    }, req.body, { new: true, runValidators: true });
    if (!job) {
        throw new errors_1.NotFoundError(`No job with id : ${jobId}`);
    }
    res.status(http_status_codes_1.default.OK).json({ job });
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    const { id: jobId } = req.params;
    const { userId } = req.user;
    const job = await Job_1.default.findOneAndDelete({
        _id: jobId,
        createdBy: userId,
    });
    if (!job) {
        throw new errors_1.NotFoundError(`No job with id : ${jobId}`);
    }
    res.status(http_status_codes_1.default.OK).json({ job });
};
exports.deleteJob = deleteJob;
//# sourceMappingURL=jobs.js.map