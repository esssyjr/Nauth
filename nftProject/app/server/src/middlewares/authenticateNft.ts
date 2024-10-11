import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import FormData from 'form-data'; // Import form-data package
import path from 'path';
import axios from 'axios';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.file) {
    res.status(400).send({ error: 'No file uploaded' });
    return;
  }

  // Read the uploaded file
  const filePath = req.file.path; // Path to the uploaded file
  try {
    // Read file from the temporary path multer has stored it in
    const fileStream = fs.createReadStream(filePath);

    // Prepare the file for the request to the authentication service
    const formData = new FormData();
    formData.append('file', fileStream, req.file.originalname);

    // Send a POST request to the authentication service using Axios
    const response = await axios.post(
      'https://nauth-tjyd.onrender.com/authenticate-nft',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );
    console.log(response);

    // Process the response from Python
    if (response.data.authenticated === false) {
      res.status(403).json({
        authenticated: false,
        message: response.data.message,
        similarity_score: response.data.similarity_score,
      });
      return;
    }
    next();

    // Delete the uploaded file from the local filesystem after sending it
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('File upload failed');
    return;
  }
}

// try {
//   // Send the file to the Python FastAPI endpoint using fetch
//   const fileStream = fs.createReadStream(filePath);

//   const formData = new FormData();
//   // Append the file stream to FormData with the correct field name
//   formData.append('file', fileStream, path.basename(filePath));

//   // Send a POST request to the Python FastAPI service
//   const response = await fetch(
//     'https://nauth-tjyd.onrender.com/authenticate-nft',
//     {
//       method: 'POST',
//       body: formData as any, // TypeScript might require you to cast formData as 'any'
//       headers: formData.getHeaders(), // Set the correct multipart headers
//     }
//   );

//   const result = await response.json();
//   console.log('result', result);
//   // Process the response from Python
//   if (result.authenticated === false) {
//     res.status(403).json({
//       authenticated: false,
//       message: result.message,
//       similarity_score: result.similarity_score,
//     });
//     return;
//   }

//   // If the NFT is authenticated, proceed to the next middleware
//   next();
// } catch (error) {
//   console.error('Error authenticating NFT:', error);
//   res.status(500).send({ error: 'Error authenticating NFT' });
//   return;
// } finally {
//   // Clean up the uploaded file after processing
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error('Error deleting the file:', err);
//     }
//   });
// }
