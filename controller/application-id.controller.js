import cloudinary from "../lib/cloudinary.ts";
import Application from "../models/Application.js";

// DELETE /applications/:id
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    await cloudinary.uploader.destroy(application.resumePublicId, {
      resource_type: "raw",
    });

    await application.deleteOne();

    return res.status(200).json({ message: "Application deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Delete failed" });
  }
};
