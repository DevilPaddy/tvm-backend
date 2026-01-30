import express from "express";
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteUserContact,
} from "../controller/usercontact.controller.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);
router.get("/:id", getContactById);
router.patch("/:id", updateContact);
router.delete("/:id", deleteUserContact);

export default router;