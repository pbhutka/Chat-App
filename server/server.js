import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { app, server } from "./socket/socket.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/mongoose-connect.js";

connectDB();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

app.use("/user", userRoutes);
app.use("/messages", messageRoutes); 

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});