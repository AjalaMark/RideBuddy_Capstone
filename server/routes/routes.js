import express from "express";
import Controller from "../controllers/Controller.js";
import { authenticateToken } from "../middlewares/Middleware.js";

const router = express.Router();

router
  .post("/login", Controller.post_login)
  .post("/register", Controller.post_register)
  .get("/home", authenticateToken, Controller.get_home)
  .post("/post-ride", authenticateToken, Controller.post_ride);

export default router;
