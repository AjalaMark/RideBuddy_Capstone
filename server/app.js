import express from "express";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import {} from "dotenv/config.js";
import http from "http";
import { Server } from "socket.io";
import Chat from "./models/ChatModel.js";

const app = express();
const server = http.createServer(app);

const uri = process.env.MONGO_URI;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.set("socketio", io);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB, error: ${err}`);
  });

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });

  socket.on("chat message", (msg) => {
    console.log("Received chat message:", msg);
    io.emit("chat message", msg);
  });

  socket.on("typing", (data) => {
    const { userId, contactId } = data;
    io.emit("typing", { userId, contactId });
  });

  socket.on("message delivered", async (data) => {
    console.log("Message delivered event received:", data);

    const { chatId, messageId, receiverId } = data;

    try {
      const result = await Chat.updateOne(
        { _id: chatId, "messages._id": messageId },
        { $set: { "messages.$.status": "delivered" } }
      );
      console.log("MongoDB update result:", result);

      io.to(receiverId).emit("message status updated", {
        chatId,
        messageId,
        status: "delivered",
      });
      console.log(
        "Emitted message status updated to delivered for:",
        receiverId
      );
    } catch (error) {
      console.error("Error updating message status to delivered:", error);
    }
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
