const express = require("express");
const cloudinary = require("../config/cloudinary");
const upload = require("../config/multer");
const router = express.Router();

router.post("/profile-pic", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    const result = await cloudinary.uploader.upload_stream(
      {
        folder: "donors/profile_pics", // Optional folder in your Cloudinary
        resource_type: "image",
      },
      (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json({ url: result.secure_url });
      }
    );

    // This line is required to start streaming the file buffer
    file.stream.pipe(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image upload failed" });
  }
});

module.exports = router;
