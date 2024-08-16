const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const coursesRouter = require("./Router/coursersRouter");
const userRouer = require("./Router/userRouter");
const path = require("path");
const app = express();
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/courses", coursesRouter);
app.use("/users", userRouer);
app.listen("4000", () => console.log("Connected To Port 4000"));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to DATABASE"))
  .catch((error) => console.error(error));
