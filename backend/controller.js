import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuidv4 } from 'uuid';
import { s3Client } from './s3.js';
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const uploadImage = async (req, res) => {
  try {
    const { file } = req;
    const userId = req.headers['x-user-id'];

    if (!file || !userId) {
      res.json({
        status: false,
      });
    }
    console.log('file.mimetype', file.mimetype);
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.BUCKET,
        Key: `images/${uuidv4()}`, // File name you want to save as in S3
        Body: file.buffer, // Assuming you're using multer to parse the file
        ContentType: file.mimetype,
        ACL: 'public-read', // Optional: Set permissions (public-read for public access)
      },
    });

    const data = await upload.done();
    res.status(200).json({ message: 'File uploaded successfully', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error uploading file' });
  }
};

export const getAllImageUrls = async (req, res) => {
  try {
    const bucketName = process.env.BUCKET;
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: 'images/', // Folder where your images are stored, if applicable
    });

    const response = await s3Client.send(command);

    if (!response.Contents) {
      return res.status(404).json({ message: 'No images found' });
    }

    const imageUrls = await Promise.all(
      response.Contents.map(async (item) => {
        const getObjectCommand = new GetObjectCommand({
          Bucket: bucketName,
          Key: item.Key,
        });

        const url = await getSignedUrl(s3Client, getObjectCommand, {
          expiresIn: 3600,
        }); // URL expires in 1 hour
        return url;
      })
    );

    res.status(200).json({ images: imageUrls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving image URLs' });
  }
};
