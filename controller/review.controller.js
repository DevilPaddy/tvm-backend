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
