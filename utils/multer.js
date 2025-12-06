const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Folder paths
const IMAGE_DIR = 'public/uploads/images';
const VIDEO_DIR = 'public/uploads/videos';

const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created folder: ${dir}`);
  }
};

ensureDirExists(IMAGE_DIR);
ensureDirExists(VIDEO_DIR);

// Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, IMAGE_DIR);
    } else if (file.mimetype.startsWith('video')) {
      cb(null, VIDEO_DIR);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|webp/;
  const allowedVideoTypes = /mp4|mkv|webm|avi/;

  const ext = path.extname(file.originalname).toLowerCase().substring(1);

  if (allowedImageTypes.test(ext) || allowedVideoTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed'));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB
  },
  fileFilter,
});

module.exports = upload;
