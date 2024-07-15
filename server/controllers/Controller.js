import bcrypt from "bcrypt";
import { userModel } from "../models/UserModel.js";
import {} from "dotenv/config.js";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { PostRideModel } from "../models/PostRideModel.js";
import { CityModel } from "../models/CityModel.js";
import { CarDetailsModel } from "../models/CarDetailsModel.js";
import { BookingModel } from "../models/BookingModel.js"
import {promisify} from "util"

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

  static get_ride = async (req, res) => {
    try {
      let filter = {};
      const { startCity, endCity, departTime, passengerNum } = req.query;

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

  static check_ride_availability = async (req, res) => {
    try {
      const rideId = req.params.id;
      check_ride_avail(rideId, (e, avail)=>{
        if (e) {
          return res.status(500).json({ message: e.message });
        }
        if (avail) {
          res.status(200).json({ message: "available" });
          return
        }
        res.status(200).json({ message: "unavailable" });
      })
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  static get_booking = async (req, res) => {
    try {
      const user = req.user.userId
      const booking = await BookingModel.find({passenger: user})
        .populate({
          path: "ride",
          populate: { path: 'driver' },
        })
        .populate({
          path: "ride",
          populate: { path: 'startCity' },
        })
        .populate({
          path: "ride",
          populate: { path: 'endCity' },
        })
        .populate("passenger");
      res.status(200).json({booking, message: "get booking successfully"})
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
    
  }
  static post_booking = async (req, res) => {
    try {
      let rideId = req.body.rideId
      let avail = await promisify(check_ride_avail)(rideId)
      if (!avail) {
        return res.status(200).json({ message: "ride occupied" });
      }
      let user = req.user.userId
      const booking = new BookingModel({
        ride: rideId,
        passenger: user
      })
      await booking.save()
      res.status(200).json({ message: "ride book successfully" });
    } catch(e) {
      res.status(500).json({ message: e.message });
    }
  }
}

async function check_ride_avail(rideId, cb) {
  try {
    const ride = await PostRideModel.findById(rideId)
    if (!ride) {
      return cb(new Error("no such ride"))
    }
    const booking = await BookingModel.findOne({ride: rideId})
    if (!booking) {
      cb(null, true)
      return
    }
    cb(null, false)
  } catch (e) {
    cb(e);
  }
}
