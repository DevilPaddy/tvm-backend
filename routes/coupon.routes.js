import express from "express";
import {
    getActiveOffer,
    createOffer,
    deleteActiveOffer,
} from "../controller/coupon.controller.js";

const router = express.Router();

router.get("/active", getActiveOffer);
router.post("/", createOffer);
router.delete("/active", deleteActiveOffer);

export default router;
