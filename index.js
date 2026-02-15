import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
console.log("SERVER FILE RUNNING");

dotenv.config();

import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
//import { connect } from "mongoose";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
//import { addressRoutes } from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";
import { connectCloudinary } from "./config/cloudinary.js";

const app = express();

connectDB();
connectCloudinary();
//const allowedOrigins = ["http://localhost:5173"];
// middleware;

app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.set("trust proxy", 1);

app.use(
    cors({
        origin: "https://frontend-grocery-app.onrender.com",
        credentials: true,
    })
);


app.use(cookieParser());
app.use((req, res, next) => {
    const proto = req.headers["x-forwarded-proto"];
    if (proto && proto !== "https") {
        return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
});

//Api Endpoints;
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});