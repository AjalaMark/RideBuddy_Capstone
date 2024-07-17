import { model, Schema } from "mongoose";

const bookingSchema = new Schema({
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: "ride", required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userData",
    required: true,
  },
  bookingTime: { type: Date, default: Date.now },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
});

const Booking = model("Booking", bookingSchema);

export default Booking;
