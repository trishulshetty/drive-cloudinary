const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const User = require("../models/user.models");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
const upload = multer();

router.post("/", authMiddleware, upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const fileName = req.body.name || req.file.originalname || "Untitled";

    const stream = cloudinary.uploader.upload_stream({ folder: "uploads" }, async (err, result) => {
        if (err) return res.status(500).json({ message: "Upload error", err });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.files.push({ name: fileName, url: result.secure_url });
        await user.save();

        res.json({ name: fileName, url: result.secure_url });
    });

    streamifier.createReadStream(req.file.buffer).pipe(stream);
});

module.exports = router;
