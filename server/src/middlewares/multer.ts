import crypto from 'crypto';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: '../storage',
  filename: (req, file, cb) => {
    cb(null, `${crypto.randomBytes(24).toString('hex')}-${Date.now()}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only image files allowed'));
    }

    cb(null, true);
  },
});

export default upload;
