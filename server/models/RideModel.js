import {model, Schema} from "mongoose";

const rideSchema = Schema({
    car: {
        type: Schema.ObjectId,
        ref: "Car",
    },
    driver: {
        type: Schema.ObjectId,
        ref: "userData",
        required: true
    },
    startCity: {
        type: Schema.ObjectId,
        ref: "City",
        required: true
    },
    endCity: {
        type: Schema.ObjectId,
        ref: "City",
        required: true
    },
    departTime: {
        type: Date,
        required: true
    }

})

const RideModel = model("Ride", rideSchema);
export { RideModel };