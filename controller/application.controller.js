import cloudinary from "../lib/cloudinary.ts";
import Application from "../models/Application.js";

// POST /applications
export const createApplication = async (req, res) => {
  try {
    const { fields, files } = req;

    const resume = files.resume?.[0];
    if (!resume) {
      return res.status(400).json({ error: "Resume required" });
    }

    const upload = await cloudinary.uploader.upload(resume.filepath, {
      folder: "job_applications/resumes",
      resource_type: "raw",
    });

    const application = await Application.create({
      fullName: fields.fullName?.[0],
      email: fields.email?.[0],
      phone: fields.phone?.[0],
      jobCategory: fields.jobCategory?.[0],
      experienceLevel: fields.experienceLevel?.[0],
      portfolio: fields.portfolio?.[0] || "",
      message: fields.message?.[0],
      resumeUrl: upload.secure_url,
      resumePublicId: upload.public_id,
    });

    return res.status(201).json(application);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Submission failed" });
  }
};

// GET /applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    return res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Fetch failed" });
  }
};
