import { model, Schema } from "mongoose";

const carSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  licensePlate: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "userData", required: true },
});

const CarDetailsModel = model("car", carSchema);

export { CarDetailsModel };
