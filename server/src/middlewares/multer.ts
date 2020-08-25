import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import config from '../config';
import createHttpError from '../utils/httpError';

const storage = multer.diskStorage({
  destination: config.storageDir,
  filename: (req, file, cb) => {
    cb(null, `${crypto.randomBytes(24).toString('hex')}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 32 * 1024 * 1024 * 1024, // 32MB Max file size
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      return cb(createHttpError(422, 'Only image files are allowed [jpg, jpeg, png]'));
    }

    cb(null, true);
  },
});

export default upload;
