"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// error handler
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
// routes
const jobs_1 = __importDefault(require("./routes/jobs"));
const auth_1 = __importDefault(require("./routes/auth"));
// db
const connect_1 = __importDefault(require("./db/connect"));
// middleware
const authentication_1 = __importDefault(require("./middleware/authentication"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.set("trust proxy", 1);
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, xss_clean_1.default)());
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/jobs", authentication_1.default, jobs_1.default);
app.use(not_found_1.default);
app.use(error_handler_1.default);
const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await (0, connect_1.default)(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=index.js.map