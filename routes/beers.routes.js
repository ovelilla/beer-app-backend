// Vendors
import express from "express";
// Controllers
import {
  create,
  find,
  readAll,
  readByLike,
  readOne,
  remove,
  removeMultiple,
  update,
} from "../controllers/beers.controller.js";
// Middleware
import checkAuth from "../middleware/checkAuth.middleware.js";
import processImageUpload from "../middleware/processImageUpload.middleware.js";

const router = express.Router();

router.get("/beers", checkAuth, readAll);
router.get("/beers/likes", checkAuth, readByLike);
router.get("/beers/:id", checkAuth, readOne);
router.post("/beers", checkAuth, processImageUpload, create);
router.post("/beers/find", checkAuth, find);
router.put("/beers/:id", checkAuth, processImageUpload, update);
router.delete("/beers/:id", checkAuth, remove);
router.delete("/beers", checkAuth, removeMultiple);

export default router;
