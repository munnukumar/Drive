const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { determineFolder } = require("../utils/determineFolder");
const { v4: uuidv4 } = require("uuid");

exports.saveToDrive = async (file, media, userId, parentId = null) => {

  if (parentId) {
    const parentFolder = await prisma.driveItem.findUnique({
      where: { id: parentId },
      select: { createdBy: true, type: true }
    });

    if (!parentFolder || parentFolder.type !== "FOLDER") {
      throw new Error("Parent folder not found");
    }
    if (parentFolder.createdBy !== userId) {
      throw new Error("Permission denied: you do not own this folder");
    }
  }

  const userDir = path.join("drive", userId);
  fs.mkdirSync(userDir, { recursive: true });

  const folderPath = parentId
    ? await getFolderPathFromParent(parentId)
    : userDir;

  const destPath = path.join(folderPath, file.originalname);
  fs.renameSync(file.path, destPath);

  const shareLink = uuidv4();

  const driveEntry = await prisma.driveItem.create({
    data: {
      type: "FILE",
      mediaId: media.id,
      name: file.originalname,
      path: destPath,
      createdBy: userId,
      permission: "READ",
      shareLink,
      parentId,
    },
  });

  return { shareLink, path: destPath };
};


async function getFolderPathFromParent(folderId) {
  const folder = await prisma.driveItem.findUnique({ where: { id: folderId } });
  if (!folder || folder.type !== "FOLDER") {
    throw new Error("Invalid parent folder ID");
  }
  return folder.path;
}

exports.createFolder = async (name, userId, parentId = null) => {
  try {

    console.log("name :", name)
    console.log("userId :", userId)
    if (!name || !userId) {
      throw new Error("Missing folder name or userId");
    }

    const basePath = parentId
      ? await getFolderPathFromParent(parentId)
      : path.join("drive", userId);

    const folderPath = path.join(basePath, name);
    fs.mkdirSync(folderPath, { recursive: true });

    const folder = await prisma.driveItem.create({
      data: {
        type: "FOLDER",
        name,
        path: folderPath,
        createdBy: userId,
        permission: "WRITE",
        parentId: parentId || null,
      },
    });

    return folder;
  } catch (error) {
    console.error("Folder creation failed:", error.message);
    throw error;
  }
};


exports.updateFolder = async (folderId, newName) => {
  const folder = await prisma.driveItem.findUnique({ where: { id: folderId } });
  if (!folder) { 
    const err = new Error("Folder not found"); 
    err.status = 404; 
    throw err; 
  }
  const newPath = path.join(path.dirname(folder.path), newName);
  fs.renameSync(folder.path, newPath);
  return prisma.driveItem.update({ where: { id: folderId }, data: { name: newName, path: newPath } 
  });
};

exports.deleteFolder = async (folderId) => {
  const folder = await prisma.driveItem.findUnique({ where: { id: folderId } });
  if (!folder) { 
    const err = new Error("Folder not found"); 
    err.status = 404; 
    throw err;
  }
  fs.rmdirSync(folder.path, { recursive: true });
  return prisma.driveItem.deleteMany({ 
    where: { OR: [{ id: folderId }, { parentId: folderId }] } 
  });
};


exports.updateFileName = async (fileId, newName) => {
  const file = await prisma.driveItem.findUnique({ where: { id: fileId } });
  if (!file) { 
    const err = new Error("File not found"); 
    err.status = 404; 
    throw err; 
  }
  const newPath = path.join(path.dirname(file.path), newName);
  fs.renameSync(file.path, newPath);
  return prisma.driveItem.update({ where: { id: fileId }, data: { name: newName, path: newPath } 
  });
};

exports.deleteFile = async (fileId) => {
  const file = await prisma.driveItem.findUnique({ where: { id: fileId }, include: { media: true } });
  if (!file) 
    { const err = new Error("File not found"); 
      err.status = 404; 
      throw err; 
    }
  fs.unlinkSync(file.path);
  await prisma.media.delete({ where: { id: file.mediaId } });
  return prisma.driveItem.delete({ where: { id: fileId } });
};

