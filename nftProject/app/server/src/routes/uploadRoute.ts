import { Router } from 'express';
import { uploadNft } from '../controllers/fileController';
import multer from 'multer';
import path from 'path';

import fs from 'fs';
import authenticateNft from '../middlewares/authenticateNft';
// Create a router
const uploadRouter = Router();

// Configure Multer to handle image uploads
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define where to store the uploaded files (temporary folder)
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Rename the file to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
// Initialize Multer with storage configuration
const upload = multer({ storage: storage })

// Define routes
uploadRouter.route('/upload').post(upload.single('nft'), authenticateNft, uploadNft);



// Create the uploads folder if it doesn't exist
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir);
}
export default uploadRouter;
