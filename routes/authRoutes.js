import express from "express";
import {
    register,
    login,
    logout,
    auth,
} from "../controllers/authController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", checkAuth, logout);
router.get("/verify", checkAuth, auth);

export default router;
