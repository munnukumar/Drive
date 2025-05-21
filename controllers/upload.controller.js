const uploadService = require("../services/upload.service");

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const { userId, parentId } = req.body;

    const result = await uploadService.handleFileUpload(file, userId, parentId);

    res.status(200).json({
      message: "File uploaded successfully!",
      data: {
        media: result.media,
        shareLink: result.drive.shareLink,
      },
    });
  } catch (error) {
    console.error("Upload error:", error.message);
    let status = 500;
    if (error.message.includes("Permission denied")) status = 403;
    else if (error.message.includes("not found")) status = 404;
    else if (error.message.includes("Missing")) status = 400;
    res.status(status).json({ error: error.message });
  }
};


