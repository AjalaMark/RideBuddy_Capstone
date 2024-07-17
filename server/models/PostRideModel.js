import { model, Schema } from "mongoose";

const rideSchema = new Schema({
  departTime: { type: Date, required: true },
  returnTime: { type: Date, required: true },
  travelDate: { type: Date, required: true },
  car: { type: Schema.Types.ObjectId, ref: "car", required: true },
  startCity: { type: Schema.Types.ObjectId, ref: "city", required: true },
  endCity: { type: Schema.Types.ObjectId, ref: "city", required: true },
  driver: { type: Schema.Types.ObjectId, ref: "userData", required: true },
  carModel: { type: String, required: true },
  carType: { type: String, required: true },
  carColor: { type: String, required: true },
  carYear: { type: Number, required: true },
  licensePlate: { type: String, required: true },
  seatsNumber: { type: Number, required: true },
  seatPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["available", "booked", "completed"],
    default: "available",
  },
});

const PostRideModel = model("ride", rideSchema);

export { PostRideModel };
