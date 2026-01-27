import Coupon from "../models/Coupon.js";

// GET /coupons/active
export const getActiveOffer = async (req, res) => {
    try {
        const offer = await Coupon.findOne({ isActive: true }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            data: offer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// POST /coupons
export const createOffer = async (req, res) => {
    try {
        const {
            title,
            amount,
            couponCode,
            discountType,
            discountValue,
            lottieUrl,
            durationHours,
        } = req.body;

        if (
            !title ||
            !amount ||
            !couponCode ||
            !discountType ||
            !discountValue ||
            !lottieUrl ||
            !durationHours
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const expiresAt = new Date(
            Date.now() + durationHours * 60 * 60 * 1000
        );

        // deactivate old offers
        await Coupon.updateMany({}, { isActive: false });

        const offer = await Coupon.create({
            title,
            amount,
            code: couponCode,
            discountType,
            discountValue,
            lottieUrl,
            expiresAt,
            isActive: true,
        });

        return res.status(201).json({
            success: true,
            message: "Offer created successfully",
            data: offer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE /coupons/active
export const deleteActiveOffer = async (req, res) => {
    try {
        const deletedOffer = await Coupon.findOneAndDelete({ isActive: true });

        if (!deletedOffer) {
            return res.status(404).json({
                success: false,
                message: "No active offer found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Active offer deleted",
            data: deletedOffer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
