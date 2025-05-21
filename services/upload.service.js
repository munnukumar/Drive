const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const driveService = require("./drive.services");

exports.handleFileUpload = async (file, userId, parentId = null) => {
  const media = await prisma.media.create({
    data: {
      filename: file.originalname,
      mimeType: file.mimetype,
      path: file.path,
      uploadedBy: userId,
    },
  });

  const driveData = await driveService.saveToDrive(file, media, userId, parentId);
  return { media, drive: driveData };
};




