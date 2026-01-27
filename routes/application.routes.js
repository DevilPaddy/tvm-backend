import express from "express";
import {
    createApplication,
    getApplications,
} from "../controller/application.controller.js";
import { deleteApplication } from "../controller/application-id.controller.js";
import { formidableMiddleware } from "../middlewares/formidable.middleware.js";

const router = express.Router();

router.post("/", formidableMiddleware, createApplication);
router.get("/", getApplications);
router.delete("/:id", deleteApplication);

export default router;
