import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";

// Import routes
import applicationRoutes from "./routes/application.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import jobRoutes from "./routes/job.routes.js";
import projectRoutes from "./routes/project.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import usercontactRoutes from "./routes/usercontact.routes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/applications", applicationRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/usercontacts", usercontactRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start server after DB connection
const startServer = async () => {
  try {
    await dbConnect();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
