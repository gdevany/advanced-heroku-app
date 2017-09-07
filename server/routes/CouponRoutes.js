import express from "express";
import {list,show,create} from "../controllers/CouponController";

const router = express.Router();

router.get("/coupons", list);
router.get("/coupons/:username", show);
router.post("/coupons", create);

export default router;
