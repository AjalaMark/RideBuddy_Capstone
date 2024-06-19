import { model, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, default: "default" },
  lastName: { type: String, default: "default" },
  email: {
    type: String,
    default: "default",
    required: [true, "User email required"],
  },
  password: { type: String, required: true },
  phoneNumber: { type: Number, default: "0", required: true },
  profilePicture: { type: String, default: null },
});

const userModel = model("userData", userSchema);
export { userModel };
