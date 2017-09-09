import express from "express";
import {list,show,create} from "../controllers/CouponController";

const router = express.Router();

router.get("/api/coupons", list);
router.get("/api/coupons/:username", show);
router.post("/api/coupons", create);

export default router;
