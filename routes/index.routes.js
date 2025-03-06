const express = require("express");
const router = express.Router();
const User = require("../models/user.models");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.render("home.ejs", { user, files: user.files });
    } catch (error) {
        res.status(500).send("Error fetching user files");
    }
});

module.exports = router;
