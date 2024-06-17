import {model, Schema} from "mongoose";
const citySchema = Schema({
    name: {
        type: String,
        required: true
    }
})
const CityModel = model("City", citySchema);
export { CityModel };