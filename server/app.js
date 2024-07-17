import express from "express";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import {} from "dotenv/config.js";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const uri = process.env.MONGO_URI;
const io = new Server(server);

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
    console.log("connected to mongodb successfully");
  })
  .catch((err) => {
    console.log(`error connecting to mongodb, error: ${err}`);
  });

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
