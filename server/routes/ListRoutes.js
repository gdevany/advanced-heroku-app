import express from "express";
import {create,update} from "../controllers/ListController";

const router = express.Router();

router.post("/api/lists", create);
router.put("/api/lists/:id", update);

export default router;
