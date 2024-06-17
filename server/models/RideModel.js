import {Schema} from "mongoose";

const rideSchema = Schema({
    car: {
        type: Schema.ObjectId,
        ref: "Car",
        required: true
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
        type: Schema.Date,
        required: true
    }

})

const RideModel = mongoose.model("Ride", rideSchema);
export { RideModel };