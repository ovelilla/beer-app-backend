import express from "express";
import {
    readAll,
} from "../controllers/beersController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/beers", checkAuth, readAll);

export default router;
