import express from "express";
import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
} from "../controller/project.controller.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
