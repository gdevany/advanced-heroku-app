import express from "express";
import {list,show,create} from "../../controllers/blog/ArticleController";

const router = express.Router();

// router.get("/api/articles", list);
// router.post("/api/articles", create);
// router.get("/api/articles/:id", show);

export default router;
