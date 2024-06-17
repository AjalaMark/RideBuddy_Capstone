import {model, Schema} from "mongoose";
const carSchema = Schema({
    model: String,
    licensePlate: String
})
const CarModel = model("Car", carSchema);
export { CarModel };