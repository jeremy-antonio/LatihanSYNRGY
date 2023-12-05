import { Multer } from "multer";

const multer = require("multer");

const storage = multer.memoryStorage();

export default multer({ storage });
