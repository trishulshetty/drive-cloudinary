const express = require("express");
const app = express();

const userRouter = require("./routes/user.routes");
const indexRouter = require("./routes/index.routes");
const uploadRouter = require("./routes/upload.routes");

const cloudinary = require("./config/cloudinary"); // Cloudinary setup
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const streamifier = require("streamifier");

dotenv.config();

const connectToDB = require("./config/db");
connectToDB(); // Connect to Database

// Middleware setup
app.set("view engine", "ejs"); // Set EJS as view engine
app.use(express.static("public")); // Serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const upload = multer(); // Multer setup for file handling

console.log("Cloudinary ENV Variables:", {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
});

// Routes

app.use("/user", userRouter);
app.use("/", indexRouter);
app.use("/upload", uploadRouter);

// Cloudinary File Upload Route


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
