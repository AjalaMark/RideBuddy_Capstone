import express from "express";
import Controller from "../controllers/Controller";
import { authenticateToken } from "../middlewares/Middleware";

const router = express.Router();

router
  .post("/login", Controller.post_login)
  .post("/register", Controller.post_register)
  .get("/home", authenticateToken, Controller.get_home);
