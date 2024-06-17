import express from "express";
import Controller from "../controllers/Controller.js";
import RideController from "../controllers/RideController.js";
import { authenticateToken } from "../middlewares/Middleware.js";

const router = express.Router();

router
  .post("/login", Controller.post_login)
  .post("/register", Controller.post_register)
  .get("/home", authenticateToken, Controller.get_home)
  .get("/ride", authenticateToken, RideController.get_ride)
  .post("/ride", authenticateToken, RideController.post_ride)

export default router;
