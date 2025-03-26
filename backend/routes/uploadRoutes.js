import express from "express";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ message: "File uploaded successfully", file: req.file });
});

export default router;
