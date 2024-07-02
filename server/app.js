import express from "express";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
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

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

app.use("/", router);
