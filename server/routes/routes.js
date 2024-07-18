import express from "express";
import Controller from "../controllers/Controller.js";
import { authenticateToken } from "../middlewares/Middleware.js";

const router = express.Router();

router
  .post("/login", Controller.post_login)
  .post("/register", Controller.post_register)
  .get("/home", authenticateToken, Controller.get_home)
  .get("/ride", Controller.get_ride)
  .get("/ride/:rideId", Controller.get_ride_id)
  .post("/ride", authenticateToken, Controller.post_ride)
  .get("/city", Controller.get_city)
  .post("/city", Controller.post_city)
  .get("/contacts/:userId", Controller.getContactsByContactId)
  .get("/history/:userId/:contactId", Controller.get_message)
  .post("/send", Controller.post_message)
  .get("/ride/:id/availability", Controller.check_ride_availability)
  .get("/booking", authenticateToken, Controller.get_booking)
  .post("/booking", authenticateToken, Controller.post_booking);

export default router;
