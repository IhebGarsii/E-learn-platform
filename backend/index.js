const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const coursesRouter = require("./Router/coursersRouter");
const userRouer = require("./Router/userRouter");
const path = require("path");
const cartRouter = require("./Router/cartRouter");
const couponRouer = require("./Router/couponRouter");
const projectRouter = require("./Router/projectRouter");
const videoRouter = require("./Router/videoRouter");
const http = require("http");
const { Server } = require("socket.io");
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
app.use("/cart", cartRouter);
app.use("/coupon", couponRouer);
app.use("/projects", projectRouter);
app.use("/videos", videoRouter);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // set your React frontend URL here
  },
});

let onlineUsers = new Map(); // Or use Redis for scalability

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("user-connected", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`${userId} is online`);
    io.emit("update-online-users", Array.from(onlineUsers.keys()));
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log(`${userId} is offline`);
        break;
      }
    }
    io.emit("update-online-users", Array.from(onlineUsers.keys()));
  });
});

server.listen("4000", () => console.log("Connected To Port 4000"));
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to DATABASE"))
  .catch((error) => console.error(error));
