import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import { uploadImage, getAllImageUrls } from './controller.js';
import multer, { memoryStorage } from 'multer';
const app = express();

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: '*',
  })
);
app.use(json());
const storage = memoryStorage();
const upload = multer({ storage });

app.get('/', (req, res) => res.send('success'));

app.post('/images', upload.single('image'), uploadImage);
app.get('/get-images', getAllImageUrls);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
