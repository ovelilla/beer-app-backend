import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Tipo de archivo no permitido");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }

  cb(null, true);
};

const limits = {
  files: 1,
  fileSize: 1024 * 1024 * 5,
  fileNameSize: 255,
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

const processImageUpload = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ errors: { image: "El archivo es muy grande" } });
    }

    if (error) {
      return res.status(400).json({ errors: { image: error.message } });
    }

    next();
  });
};

export default processImageUpload;
