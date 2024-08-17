import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Configure AWS SDK with your credentials and region
export const s3Client = new S3Client({
  region: process.env.region, // e.g., 'us-east-1'
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});
