import express from "express";
import {
    getReviews,
    createReview,
    deleteReview,
} from "../controller/review.controller.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", createReview);
router.delete("/:id", deleteReview);

export default router;
