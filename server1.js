const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const Notification = require("./models/Notification");
const notificationRoutes = require("./routes/notifications");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

mongoose.connect("mongodb://localhost:27017/bloodBank", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/api/notifications", notificationRoutes);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("sendNotification", async (message) => {
    const newNotification = new Notification({ message });
    await newNotification.save();

    io.emit("newNotification", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});