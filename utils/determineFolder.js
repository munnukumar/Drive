const path = require("path");

exports.determineFolder = (media) => {
    console.log("=====>", media)
//   const ext = path.extname(mimeType).toLowerCase();
  const ext = `.${media.filename.split('.').pop().toLowerCase()}`;
console.log("File extension:", ext);


  const videoExts = [".mp4", ".mov", ".mkv", ".3gp"];
  const audioExts = [".mp3", ".wav", ".aac", ".ogg"];
  const pdfExts = [".pdf"];
  const docExts = [".doc", ".docx"];
  const excelExts = [".xls", ".xlsx", ".csv"];
  const imageExts = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg"];

  console.log("ext ", ext)

  if (videoExts.includes(ext)) return "video";
  if (audioExts.includes(ext)) return "audio";
  if (pdfExts.includes(ext)) return "pdf";
  if (docExts.includes(ext)) return "doc";
  if (excelExts.includes(ext)) return "excel";
  if (imageExts.includes(ext)) return "images";

  return "others";
};
