import express from "express";
import {
    createContact,
    getContacts,
    getContactById,
    updateContact,
} from "../controller/usercontact.controller.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);
router.get("/:id", getContactById);
router.patch("/:id", updateContact);

export default router;
