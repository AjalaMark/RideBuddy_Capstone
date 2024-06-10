import bcrypt from "bcrypt";
import { userModel } from "../models/UserModel.js";
import {} from "dotenv/config.js";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY;

export default class Controller {
  static post_register = async (req, res) => {
    try {
      const formData = req.body;
      console.log("Received form data:", formData);

      const userMatched = await userModel.findOne({ email: formData.email });
      if (!userMatched) {
        const hashedPassword = await bcrypt.hash(formData.password, 10);

        const user = new userModel({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNo,
          password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: "User registered" });
      } else {
        res.status(400).json({ message: "User already exists" });
      }
    } catch (err) {
      console.error("Error registering user:", err);
      res
        .status(500)
        .json({ message: "Error registering user", error: err.message });
    }
  };

  static post_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email" });
      }
      const oriPassword  = CryptoJS.AES.decrypt(password, 'ride-buddy-aes-key').toString(CryptoJS.enc.Utf8);
      console.log("oriPassword: ", oriPassword);
      const isMatch = await bcrypt.compare(oriPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token, message: "login successful" });
    } catch (err) {
      res.status(500).send("Server error");
    }
  };

  static get_home = (req, res) => {
    res.status(200).json({ message: "Welcome to the Home Page" });
  };
}
