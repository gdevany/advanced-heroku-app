import express from "express";
import {list,show,create,remove} from "../controllers/CouponController";

const router = express.Router();

router.get("/api/coupons", list);
router.get("/api/coupons/:username", show);
router.post("/api/coupons", create);
router.delete("/api/coupons/:id", remove);

export default router;
