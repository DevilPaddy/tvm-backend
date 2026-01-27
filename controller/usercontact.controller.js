import Contact from "../models/UserContact.js";
import Coupon from "../models/Coupon.js";

// POST /contacts
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, couponCode } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    let appliedCoupon = null;

    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        expiresAt: { $gte: new Date() },
      });

      if (!coupon) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired coupon",
        });
      }

      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        return res.status(400).json({
          success: false,
          message: "Coupon usage limit exceeded",
        });
      }

      coupon.usedCount += 1;
      await coupon.save();

      appliedCoupon = {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      };
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      coupon: appliedCoupon,
    });

    return res.status(201).json({
      success: true,
      message: "Contact message submitted",
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /contacts/:id
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }
};

// PATCH /contacts/:id
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedContact,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }
};
