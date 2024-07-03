import express from "express";
import Controller from "../controllers/Controller.js";
import { authenticateToken } from "../middlewares/Middleware.js";

const router = express.Router();

router
  .post("/login", Controller.post_login)
  .post("/register", Controller.post_register)
  .get("/home", authenticateToken, Controller.get_home)
  .get("/ride", authenticateToken, Controller.get_ride)
  .post("/ride", authenticateToken, Controller.post_ride)
  .get("/city", Controller.get_city)
  .post("/city", Controller.post_city);

export default router;
