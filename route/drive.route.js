const express = require("express");
const router = express.Router();
const driveController = require("../controllers/drive.controller");

router.get("/folder/:folderId", driveController.getFolderContents);
router.post("/create-folder", driveController.createFolder);
router.put("/update-folder/:folderId", driveController.updateFolder);
router.delete("/delete-folder/:folderId", driveController.deleteFolder);
router.put("/update-file/:fileId", driveController.updateFile);
router.delete("/delete-file/:fileId", driveController.deleteFile);



module.exports = router;















// const express = require("express");
// const router = express.Router();
// const driveController = require("../controllers/drive.controller");

// router.get("/drive/share/:id", driveController.accessSharedFile);

// module.exports = router;