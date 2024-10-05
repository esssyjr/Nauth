import { Request, Response } from 'express';


export const uploadNft = async (req: Request, res: Response) => {
    console.log(req.body)
    console.log(req.file)
  try {
    // Image file details
    const image = req.file

    // Metadata sent in the form
    const { title, artist, licenseType } = req.body;

    if (!image) {
        res.status(400).json({ message: 'No image file uploaded' });
        return
        
    }

    if (!title || !artist || !licenseType) {
        res.status(400).json({ message: 'Missing metadata' });
        return
         
    }


    // At this point, you can:
    // - Temporarily store the image or move it to permanent storage
    // - Save the metadata to the database
    // - Process the image further (e.g., pass it to a computer vision pipeline)

    res.status(200).json({
      message: 'Image and metadata uploaded successfully',
      imagePath: `/uploads/${image?.filename}`,
      metadata: {
        title,
        artist,
        licenseType,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server error while uploading image and metadata' });
  }
};



