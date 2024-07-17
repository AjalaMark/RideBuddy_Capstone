import bcrypt from "bcrypt";
import { userModel } from "../models/UserModel.js";
import {} from "dotenv/config.js";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { PostRideModel } from "../models/PostRideModel.js";
import { CityModel } from "../models/CityModel.js";
import { CarDetailsModel } from "../models/CarDetailsModel.js";
import Chat from "../models/ChatModel.js";
import Booking from "../models/BookingModel.js";
import { promisify } from "util";

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
          userType: formData.userType,
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
      let oriPassword = CryptoJS.AES.decrypt(
        password,
        "ride-buddy-aes-key"
      ).toString(CryptoJS.enc.Utf8);
      if (req.body?.notEncrypted) {
        oriPassword = password;
      }
      console.log("oriPassword: ", oriPassword);
      const isMatch = await bcrypt.compare(oriPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const { userType } = user;
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token, userType, message: "login successful" });
    } catch (err) {
      res.status(500).send("Server error");
    }
  };

  static get_home = (req, res) => {
    res.status(200).json({ message: "Welcome to the Home Page" });
  };

  static get_ride = async (req, res) => {
    try {
      let filter = {};
      const { startCity, endCity, departTime } = req.query;

      if (startCity) {
        const startCityObj = await CityModel.findOne({ name: startCity });
        if (startCityObj) {
          filter.startCity = startCityObj._id;
        }
      }
      if (endCity) {
        const endCityObj = await CityModel.findOne({ name: endCity });
        if (endCityObj) {
          filter.endCity = endCityObj._id;
        }
      }
      if (departTime) {
        let departTimeDateLT1H = new Date(departTime);
        departTimeDateLT1H.setHours(departTimeDateLT1H.getHours() + 1);
        let departTimeDateGT1H = new Date(departTime);
        departTimeDateGT1H.setHours(departTimeDateGT1H.getHours() - 1);
        filter.departTime = {
          $lte: departTimeDateLT1H,
          $gte: departTimeDateGT1H,
        };
      }

      const rides = await PostRideModel.find(filter)
        .populate("driver")
        .populate("startCity")
        .populate("endCity");
      res
        .status(200)
        .json({ rides, message: "Ride(s) retrieved successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  static get_ride_id = async (req, res) => {
    try {
      const rideId = req.params.rideId;
      const ride = await PostRideModel.findById(rideId).populate(
        "driver startCity endCity"
      );
      if (!ride) {
        return res.status(404).json({ message: "Ride not found" });
      }
      res.json({ ride });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  static post_ride = async (req, res) => {
    try {
      let {
        origin,
        destination,
        departureTime,
        returnTime,
        travelDate,
        carModel,
        carType,
        carColor,
        carYear,
        licensePlate,
        seatsNumber,
        seatPrice,
      } = req.body;

      const departTime = new Date(departureTime);
      const returnTimeDate = new Date(returnTime);
      const travelDateDate = new Date(travelDate);

      if (isNaN(departTime) || isNaN(returnTimeDate) || isNaN(travelDateDate)) {
        return res.status(400).json({ message: "Invalid date format" });
      }

      if (
        !carModel ||
        !carType ||
        !carColor ||
        !carYear ||
        !licensePlate ||
        !seatsNumber ||
        !seatPrice
      ) {
        return res
          .status(400)
          .json({ message: "Please Input Car Information" });
      }

      const startCityObj = await CityModel.findOne({ name: origin });
      const endCityObj = await CityModel.findOne({ name: destination });

      if (!startCityObj || !endCityObj) {
        return res.status(400).json({ message: "Invalid cities" });
      }
      const car = new CarDetailsModel({
        make: carType,
        model: carModel,
        year: carYear,
        licensePlate: licensePlate,
        user: req.user.userId,
      });

      const savedCar = await car.save();

      const ride = new PostRideModel({
        driver: req.user.userId,
        startCity: startCityObj._id,
        endCity: endCityObj._id,
        departTime: departTime,
        car: savedCar._id,
        returnTime: returnTimeDate,
        travelDate: travelDateDate,
        carModel,
        carType,
        carColor,
        carYear,
        licensePlate,
        seatsNumber,
        seatPrice,
      });

      await ride.save();
      res.status(200).json({ message: "ride post successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  static get_city = async (req, res) => {
    try {
      const city = await CityModel.find();
      res.status(200).json({ city, message: "city get successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
  // {
  //   "city": ["Guelph", "Waterloo", "Kitchener", "Toronto", "Barrie", "Kingston", "Hamilton", "Oshawa", "Windsor", "Mississauga",
  //   "Brantford", "Thunder Bay", "Brampton", "North Bay", "Ottawa", "Cambridge", "Stratford", "London"]
  // }
  static post_city = async (req, res) => {
    try {
      if (!Array.isArray(req.body?.city)) {
        throw new Error("should have a city field which type is Array");
      }
      let data = [];
      req.body.city.forEach((city) => {
        data.push({ name: city });
      });
      await CityModel.create(data, { aggregateErrors: true });
      res.status(200).json({ message: "city post successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  static get_message = async (req, res) => {
    try {
      const { userId, contactId } = req.params;
      console.log(userId, contactId);
      if (!userId || !contactId) {
        return res.status(400).json({ error: "Missing required parameters" });
      }
      const messages = await Chat.find({
        $or: [
          { senderId: userId, receiverId: contactId },
          { senderId: contactId, receiverId: userId },
        ],
      }).sort({ timestamp: 1 });

      if (!messages || messages.length === 0) {
        return res.json([]);
      }

      res.json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  };

  static post_message = async (req, res) => {
    try {
      const { senderId, receiverId, message } = req.body;

      let chat = await Chat.findOne({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });

      if (!chat) {
        chat = new Chat({
          senderId: senderId,
          receiverId: receiverId,
          messages: [],
        });
      }

      chat.messages.push({
        senderId: senderId,
        receiverId: receiverId,
        message: message,
        timestamp: new Date(),
      });

      const savedMessage = await chat.save();
      res.json(savedMessage);

      req.app.get("socketio").emit("chat message", savedMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  };

  static check_ride_availability = async (req, res) => {
    try {
      const rideId = req.params.id;
      check_ride_avail(rideId, (e, avail) => {
        if (e) {
          return res.status(500).json({ message: e.message });
        }
        if (avail) {
          res.status(200).json({ message: "available" });
          return;
        }
        res.status(200).json({ message: "unavailable" });
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  static get_booking = async (req, res) => {
    try {
      const user = req.user.userId;
      const booking = await Booking.find({ userId: user })
        .populate({
          path: "rideId",
          populate: { path: "driver" },
        })
        .populate({
          path: "rideId",
          populate: { path: "startCity" },
        })
        .populate({
          path: "rideId",
          populate: { path: "endCity" },
        })
        .populate("userId");
      res.status(200).json({ booking, message: "get booking successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  static post_booking = async (req, res) => {
    try {
      const { rideId, userId } = req.body;
      let avail = await promisify(check_ride_avail)(rideId);

      if (!avail) {
        return res
          .status(200)
          .json({ message: "Ride has already been booked" });
      }

      const paymentStatus = "completed";

      const booking = new Booking({
        rideId,
        userId,
        paymentStatus,
      });
      await booking.save();
      res.status(200).json({ message: "ride booked successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

async function check_ride_avail(rideId, cb) {
  try {
    const ride = await PostRideModel.findById(rideId);
    if (!ride) {
      return cb(new Error("no such ride"));
    }
    const booking = await Booking.findOne({ rideId: rideId });
    if (!booking) {
      cb(null, true);
      return;
    }
    cb(null, false);
  } catch (e) {
    cb(e);
  }
}
