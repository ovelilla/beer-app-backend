// Vendors
import express from "express";
// Controllers
import {
  create,
  readAll,
  readOne,
  remove,
  removeMultiple,
  update,
} from "../controllers/beertionary.controller.js";
// Middleware
import checkAuth from "../middleware/checkAuth.middleware.js";

const router = express.Router();

router.get("/beertionary", checkAuth, readAll);
router.get("/beertionary/:word", checkAuth, readOne);
router.post("/beertionary", checkAuth, create);
router.put("/beertionary/:id", checkAuth, update);
router.delete("/beertionary/:id", checkAuth, remove);
router.delete("/beertionary", checkAuth, removeMultiple);

export default router;
