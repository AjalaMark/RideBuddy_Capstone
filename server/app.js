import express from "express";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import { userModel } from "./models/UserModel.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

app.use("/", router);
