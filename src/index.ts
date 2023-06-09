import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import dotenv from "dotenv";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
// import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// error handler
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

// routes
import jobRoutes from "./routes/jobs";
import authRoutes from "./routes/auth";

// db
import connectDB from "./db/connect";

// middleware
import authMiddleware from "./middleware/authentication";

const app = express();
dotenv.config();

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
// app.use(xss());

// swagger
const swaggerDocument = YAML.load("./swagger.yaml");

app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authMiddleware, jobRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
