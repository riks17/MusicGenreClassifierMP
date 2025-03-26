import express from 'express';
import { uploadSong, getSongs } from '../controllers/songController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an audio file!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  
});

router
  .route("/")
  .post(protect, upload.single("audio"), uploadSong)
  .get(protect,getSongs);

export default router;