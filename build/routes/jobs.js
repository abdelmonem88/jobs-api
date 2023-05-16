"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobs_1 = require("../controllers/jobs");
const jobRoutes = express_1.default.Router();
jobRoutes.get("/", jobs_1.getJobs);
jobRoutes.get("/:id", jobs_1.getJob);
jobRoutes.post("/", jobs_1.createJob);
jobRoutes.patch("/:id", jobs_1.updateJob);
jobRoutes.delete("/:id", jobs_1.deleteJob);
exports.default = jobRoutes;
//# sourceMappingURL=jobs.js.map