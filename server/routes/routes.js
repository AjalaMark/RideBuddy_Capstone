import express from "express";
<<<<<<< HEAD
import Controller from "../controllers/Controller";
import { authenticateToken } from "../middlewares/Middleware";
=======
import Controller from "../controllers/Controller.js";
import { authenticateToken } from "../middlewares/Middleware.js";
>>>>>>> origin/createEndPoints

const router = express.Router();

router
  .post("/login", Controller.post_login)
  .post("/register", Controller.post_register)
  .get("/home", authenticateToken, Controller.get_home);
<<<<<<< HEAD
=======

export default router;
>>>>>>> origin/createEndPoints
