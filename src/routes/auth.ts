import Express from "express";

import { register, login } from "../controllers/auth";

const authRoutes = Express.Router();

authRoutes.post("/login", login);
authRoutes.post("/register", register);

export default authRoutes;
