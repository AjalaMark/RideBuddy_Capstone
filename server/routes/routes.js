import express from "express";
import Controller from "../controllers/Controller.js";
import { authenticateToken } from "../middlewares/Middleware.js";

const router = express.Router();

router
  .post("/login", Controller.post_login)
  .post("/register", Controller.post_register)
  .get("/profile/:userId", authenticateToken, Controller.get_profile)
  .patch("/profile/:userId", authenticateToken, Controller.update_profile)
  .patch(
    "/profile/:userId/picture",
    authenticateToken,
    Controller.update_profile_picture
  )
  .get("/bookings/pending", Controller.get_pending_bookings)
  .post("/bookings/:bookingId/accept", Controller.accept_booking)
  .post("/bookings/:bookingId/decline", Controller.decline_booking)
  .get("/ride", Controller.get_ride)
  .get("/rides/search", Controller.search)
  .get("/ride/:rideId", Controller.get_ride_id)
  .post("/ride", authenticateToken, Controller.post_ride)
  .get("/city", Controller.get_city)
  .post("/city", Controller.post_city)
  .get("/contacts/:userId", Controller.getContactsByContactId)
  .get("/history/:userId/:contactId", Controller.get_message)
  .post("/send", Controller.post_message)
  .get("/ride/:id/availability", Controller.check_ride_availability)
  .get("/booking", authenticateToken, Controller.get_booking)
  .get("/booking-ride/:rideId", Controller.get_booking_ride)
  .post("/booking", authenticateToken, Controller.post_booking);

export default router;
