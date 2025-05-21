const driveService = require("../services/drive.services");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createFolder = async (req, res) => {
  try {
    const { name, userId, parentId } = req.body;

    const newFolder = await driveService.createFolder(name, userId, parentId);
    res.status(201).json({ message: "Folder created", data: newFolder });
  } catch (error) {
    console.error("Folder creation failed", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.getFolderContents = async (req, res) => {
  try {
    const { folderId } = req.params;

    const contents = await prisma.driveItem.findMany({
      where: { parentId: folderId },
      include: { media: true },
    });

    res.status(200).json({ message: "Folder contents", data: contents });
  } catch (error) {
    console.error("Fetch folder contents failed", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.updateFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const { name } = req.body;
    const updated = await driveService.updateFolder(folderId, name);
    res.status(200).json({ message: "Folder renamed", data: updated });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    await driveService.deleteFolder(folderId);
    res.status(200).json({ message: "Folder deleted" });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};



exports.updateFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { name } = req.body;
    const updated = await driveService.updateFileName(fileId, name);
    res.status(200).json({ message: "File renamed", data: updated });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    await driveService.deleteFile(fileId);
    res.status(200).json({ message: "File deleted" });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};





