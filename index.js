const express = require("express");
const dotenv = require('dotenv');
const uploadRoutes = require("./route/upload.routes");
const driveRoutes = require("./route/drive.route");

dotenv.config();
const app = express();
const PORT = 5000;


app.use(express.json());
app.use("/api", uploadRoutes);
app.use("/api", driveRoutes);

app.listen(PORT, () => console.log("Server started on port 5000"));
