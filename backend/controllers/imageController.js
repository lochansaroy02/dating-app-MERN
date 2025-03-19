const imagekit = require("../config/imageKit");

const uploadImage = async (req, res) => {
    try {
        // Validate files exist
        if (!req.files || !req.files.images) {
            return res.status(400).json({ error: "No images uploaded" });
        }

        // Normalize files array (handle single/multiple uploads)
        const files = Array.isArray(req.files.images)
            ? req.files.images
            : [req.files.images];

        const uploadedImages = [];
        const errors = [];

        // Process each file individually
        for (const file of files) {
            try {
                // Validate file type (images only)
                if (!file.mimetype.startsWith("image/")) {
                    errors.push({
                        file: file.name,
                        error: "Invalid file type - images only"
                    });
                    continue;
                }

                // Generate unique filename
                const uniqueFileName = `${Date.now()}-${file.name}`;

                // Upload to ImageKit
                const result = await imagekit.upload({
                    file: file.data,         // File buffer
                    fileName: uniqueFileName,// Prevent filename collisions
                    folder: "/dating-app",   // Target folder in ImageKit
                });

                uploadedImages.push(result.url);
            } catch (error) {
                console.error(`Upload failed for ${file.name}:`, error);
                errors.push({
                    file: file.name,
                    error: error.message || "Failed to process file",
                });
            }
        }

        // Handle partial successes
        if (errors.length > 0) {
            return res.status(207).json({ // 207 Multi-Status
                success: uploadedImages,
                errors: errors,
                message: "Some files failed to upload",
            });
        }



        // Full success response
        res.status(200).json({ imageUrls: uploadedImages });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({
            error: error.message || "Internal server error"
        });
    }
};

module.exports = { uploadImage };