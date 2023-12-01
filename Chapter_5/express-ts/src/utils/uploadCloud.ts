import multer, { StorageEngine } from "multer";
import { Request } from "express";

const storage: StorageEngine = multer.memoryStorage();

export default multer({ storage });
