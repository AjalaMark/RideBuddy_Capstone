import express from "express";
import { userModel } from "./models/UserModel.js";

const app = express();

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
