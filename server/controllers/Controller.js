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

  static get_profile = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await userModel
        .findById(userId)
        .select("-password -userType");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  static update_profile_picture = async (req, res) => {
    try {
      const userId = req.params.userId;
      const { profilePicture } = req.body;

      const user = await userModel
        .findOneAndUpdate(
          { _id: userId },
          { profilePicture },
          { new: true, runValidators: true }
        )
        .select("-userType");

      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  static update_profile = async (req, res) => {
    try {
      const userId = req.params.userId;
      const updatedData = req.body.user;

      // Extract fields from updatedData
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        profilePicture,
      } = updatedData;

      const updateObject = {};

      if (firstName) updateObject.firstName = firstName;
      if (lastName) updateObject.lastName = lastName;
      if (email) updateObject.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateObject.password = hashedPassword;
      }
      if (phoneNumber) updateObject.phoneNumber = phoneNumber;
      if (profilePicture) updateObject.profilePicture = profilePicture;

      const user = await userModel.findOneAndUpdate(
        { _id: userId },
        updateObject,
        {
          new: true,
          runValidators: true,
        }
      );

      // Check if the user was found and updated
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      // Log the error for debugging
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
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
      const travelDateDate = new Date(travelDate);

      if (isNaN(departTime) || isNaN(travelDateDate)) {
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
        travelDate: travelDateDate,
        carModel,
        carType,
        carColor,
        carYear,
        licensePlate,
        seatsNumber,
        seatPrice,
      });

      let savedRide = await ride.save();
      res
        .status(200)
        .json({ rideId: savedRide._id, message: "ride post successfully" });
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

  static search = async (req, res) => {
    let filter = {};
    const { from, to, date } = req.query;
    try {
      const startCity = await CityModel.findOne({ name: from });
      const endCity = await CityModel.findOne({ name: to });
      if (!startCity || !endCity) {
        return res.status(404).json({ message: "City not found" });
      }
      if (!startCity || !endCity) {
        return res.status(404).json({ message: "City not found" });
      }

      // Build the filter object
      if (startCity) {
        filter.startCity = startCity._id;
      }
      if (endCity) {
        filter.endCity = endCity._id;
      }
      if (date) {
        // Assuming your date field in the model is called "rideDate"
        filter.rideDate = new Date(date);
      }
      const rides = await PostRideModel.find(filter)
        .populate("startCity")
        .populate("endCity")
        .populate("driver");

      res.status(200).json({ rides });
      console.log(`this is the object being sent ${rides}`);
    } catch (error) {
      res.status(500).send("Server error");
      console.log(error);
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

  static getContactsByContactId = async (req, res) => {
    const { userId } = req.params;
    try {
      const chats = await Chat.find({
        $or: [{ senderId: userId }, { receiverId: userId }],
      })
        .populate("senderId", "name")
        .populate("receiverId", "name");

      const contacts = [];
      chats.forEach((chat) => {
        if (chat.senderId._id.toString() !== userId) {
          contacts.push(chat.senderId);
        } else {
          contacts.push(chat.receiverId);
        }
      });

      const uniqueContacts = [
        ...new Map(
          contacts.map((contact) => [contact._id.toString(), contact])
        ).values(),
      ];

      res.json(uniqueContacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
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

      const newMessage = {
        senderId: senderId,
        receiverId: receiverId,
        message: message,
        timestamp: new Date(),
        status: "sent",
      };

      chat.messages.push(newMessage);

      const savedMessage = await chat.save();

      const addedMessage =
        savedMessage.messages[savedMessage.messages.length - 1];

      res.json({
        chatId: savedMessage._id,
        messageId: addedMessage._id,
        chat: savedMessage,
      });

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

      const booking = new Booking({
        rideId,
        userId,
        paymentStatus: "pending", // Payment is pending until ride is accepted
        status: "pending", // Booking status is pending
      });

      await booking.save();
      res.status(200).json({ message: "ride booked successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  // Controller function to get all pending bookings for a driver
  static get_pending_bookings = async (req, res) => {
    try {
      // Extract the token from the request headers
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.decode(token);
      const driverId = decoded.userId;

      // Fetch rides for the driver
      const rides = await PostRideModel.find({ driver: driverId });
      const rideIds = rides.map((ride) => ride._id);

      // Fetch pending bookings for these rides
      const bookings = await Booking.find({
        rideId: { $in: rideIds },
        status: "pending",
      }).populate("userId"); // Populate user details

      res.status(200).json(bookings);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
  // Controller function to accept a booking
  static accept_booking = async (req, res) => {
    try {
      const { bookingId } = req.params;

      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { status: "accepted", paymentStatus: "pending" }, // Adjust if needed
        { new: true } // Return the updated document
      ).populate("userId"); // Optionally populate user details

      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.status(200).json({ message: "Booking accepted successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  // Controller function to decline a booking
  static decline_booking = async (req, res) => {
    try {
      const { bookingId } = req.params;

      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { status: "declined", paymentStatus: "pending" }, // Adjust if needed
        { new: true } // Return the updated document
      ).populate("userId"); // Optionally populate user details

      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.status(200).json({ message: "Booking declined successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };

  // static get_booking_ride = async (req, res) => {
  //   try {
  //     const rideId = req.params.rideId;
  //     console.log(rideId);
  //     const booking = await Booking.findById(rideId).populate("ride");

  //     console.log(booking);

  //     if (!booking) {
  //       return res.status(404).json({ message: "Booking not found" });
  //     }

  //     res.json({ booking: ride.booking });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };
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
