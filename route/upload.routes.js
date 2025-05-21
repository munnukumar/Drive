const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadController = require("../controllers/upload.controller");

const storage = multer.diskStorage({
  destination: "temp/",
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});

const upload = multer({ storage });

router.post("/upload-files", upload.single("file"), uploadController.uploadFile);

module.exports = router;