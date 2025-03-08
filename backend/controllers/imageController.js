require("dotenv").config();
const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const uploadImage = async (req, res) => {
    if (!req.files || !req.files.images) {
        return res.status(400).json({ error: "No images uploaded" });
    }

    const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images]; // Handle single/multiple files
    let uploadedImages = [];

    try {
        for (let image of images) {
            const result = await cloudinary.uploader.upload(image.tempFilePath);
            uploadedImages.push(result.secure_url);
        }

        res.json({ images: uploadedImages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { uploadImage };