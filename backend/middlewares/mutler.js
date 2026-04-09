// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file");


import multer from "multer";

const storage = multer.memoryStorage();

export const multiUpload = multer({ storage }).fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 }
]);

export const singleUpload = multer({ storage }).single("profilePhoto");

export const logoUpload = multer({ storage }).single("logo");
