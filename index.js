// Vendors
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// Configs
import cloudinaryConfig from "./config/cloudinary.config.js";
import connectDatabase from "./config/database.config.js";
// Routes
import authRoutes from "./routes/auth.routes.js";
import beersRoutes from "./routes/beers.routes.js";
import beertionaryRoutes from "./routes/beertionary.routes.js";
import likesRoutes from "./routes/likes.routes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

dotenv.config();

cloudinaryConfig();
await connectDatabase();

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
app.use("/api", beertionaryRoutes);
app.use("/api", likesRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
