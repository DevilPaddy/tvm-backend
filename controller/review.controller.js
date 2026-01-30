import Review from "../models/Review.js";

// GET /reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /reviews
export const createReview = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      isApproved: false,
    });

    return res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    await Review.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PATCH /reviews/:id/approve
export const approveReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: review,
      message: "Review approved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /reviews/pending
export const getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: false }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
