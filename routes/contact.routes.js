import express from "express";
import { getContact, updateContact } from "../controller/contact.controller.js";

const router = express.Router();

router.get("/", getContact);
router.patch("/", updateContact);

export default router;
