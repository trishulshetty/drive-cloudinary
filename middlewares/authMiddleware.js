const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

module.exports = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.redirect("/user/login"); // Redirect to the login page
    }
    

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        
        if (!req.user) {

            return res.status(401).json({ message: "Unauthorized - User not found" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};
