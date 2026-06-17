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
const webhookRoute = require("./Router/webhook");
const http = require("http");
const { Server } = require("socket.io");
const paymentHistoryRouter = require("./Router/paymentHistoryRouter");
const recommendationRouter = require("./Router/recommendationRouter");
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
app.use("/paymentHistory", paymentHistoryRouter);
app.use("/recommendations", recommendationRouter);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // set your React frontend URL here
  },
});

/* let onlineUsers = new Map(); // Or use Redis for scalability

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("user-connected", (userId) => {
    console.log("📥 user-connected:", userId);

    onlineUsers.set(userId, socket.id);
    const onlineList = Array.from(onlineUsers.keys());

    console.log("🟢 Emitting update-online-users:", onlineList);
    const iheb ='waheb'
    io.emit("update-online-users", onlineList);
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log("❌ User disconnected:", userId);
        break;
      }
    }

    const updatedList = Array.from(onlineUsers.keys());
    console.log(
      "🟠 Emitting update-online-users after disconnect:",
      updatedList
    );
    io.emit("update-online-users", updatedList);
  });
});
 */
app.listen("4000", () => console.log("Connected To Port 4000"));
mongoose
  .connect(process.env.mongodb)
  .then(() => console.log("Connected to DATABASE"))
  .catch((error) => console.error(error));
