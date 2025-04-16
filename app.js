import http from "node:http";
import cors from "cors";
import express from "express";
import { Server } from "socket.io";

const app = express();
const PORT = 8000;
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    method: ["GET", "POST"],
    credentials:true
  },
});
io.on("connection", (socket) => {
  console.log(`New user connected ${socket.id}`);
  socket.broadcast.emit("announcement" , `${socket.id} has joined the server`)
  socket.on("message" , (msg)=>{
       console.log(msg)
       io.emit("received-message" , msg)
  })
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
