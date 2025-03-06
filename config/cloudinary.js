const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "cloudname_here",
  api_key: process.env.CLOUDINARY_API_KEY || "apikey_here",
  api_secret: process.env.CLOUDINARY_API_SECRET || "secret_here",
});

console.log("Cloudinary Config Loaded:", cloudinary.config()); // Log config

module.exports = cloudinary;
