import { model, Schema } from "mongoose";

const citySchema = new Schema({
  name: { type: String, required: true },
  province: { type: Schema.Types.ObjectId, ref: "province", required: true },
});

const CityModel = model("city", citySchema);

export { CityModel };
