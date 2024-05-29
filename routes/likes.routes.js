import express from "express";
import {
  addLike,
  removeLike,
  countLikes,
} from "../controllers/likes.controller.js";
import checkAuth from "../middleware/checkAuth.middleware.js";

const router = express.Router();

router.post("/likes", checkAuth, addLike);
router.delete("/likes/:id", checkAuth, removeLike);
router.post("/likes/count", checkAuth, countLikes);

export default router;
