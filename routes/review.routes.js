import express from "express";
import {
    getReviews,
    createReview,
    deleteReview,
    approveReview,
    getPendingReviews,
} from "../controller/review.controller.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", createReview);
router.delete("/:id", deleteReview);
router.patch("/:id/approve", approveReview);
router.get('/pending', getPendingReviews);

export default router;
