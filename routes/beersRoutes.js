import express from "express";
import {
  create,
  readAll,
  remove,
  removeMultiple,
  update,
} from "../controllers/beersController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/beers", checkAuth, readAll);
router.post("/beers", checkAuth, create);
router.put("/beers/:id", checkAuth, update);
router.delete("/beers/:id", checkAuth, remove);
router.delete("/beers", checkAuth, removeMultiple);

export default router;
