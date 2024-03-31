// Vendors
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
// Routes
import authRoutes from "./routes/authRoutes.js";
import beersRoutes from "./routes/beersRoutes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

dotenv.config();

await connectDB();

const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api", beersRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
