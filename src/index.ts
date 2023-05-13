import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const server = http.createServer(app);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
