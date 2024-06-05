import mongoose from "mongoose";
import {} from "dotenv/config.js";

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb successfully");
  })
  .catch((err) => {
    console.log(`error connecting to mongodb, error: ${err}`);
  });

const userSchema = mongoose.Schema({
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

const userModel = mongoose.model("userData", userSchema);
export { userModel };
