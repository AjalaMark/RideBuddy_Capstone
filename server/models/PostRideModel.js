import { model, Schema } from "mongoose";

const rideSchema = new Schema({
  departTime: { type: Date, required: true },
  car: { type: Schema.Types.ObjectId, ref: "car", required: true },
  startCity: { type: Schema.Types.ObjectId, ref: "city", required: true },
  endCity: { type: Schema.Types.ObjectId, ref: "city", required: true },
  driver: { type: Schema.Types.ObjectId, ref: "userData", required: true },
});

const PostRideModel = model("ride", rideSchema);

export { PostRideModel };
