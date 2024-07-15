import { model, Schema } from "mongoose";

const bookingSchema = new Schema({
    ride: {
        type: Schema.Types.ObjectId, 
        ref: "ride", 
        required: true
    },
    passenger: { 
        type: Schema.Types.ObjectId, 
        ref: "userData", 
        required: true },
})

const BookingModel = model("booking", bookingSchema);

export { BookingModel };