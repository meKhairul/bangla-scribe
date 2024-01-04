const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
const multer = require('multer');
const tts = require('google-tts-api');
const Tesseract = require('tesseract.js');
const axios = require('axios');
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express.static('uploads'));

// Endpoint to upload an image and extract Bangla text
app.post('/extract-bangla-text', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const imagePath = req.file.path;

  // Perform OCR using Tesseract
  Tesseract.recognize(
    imagePath,
    'ben', // Languages to recognize ( Bengali)
    {
      logger: (info) => console.log(info),
    }
  )
    .then(({ data: { text } }) => {
      // Send the extracted text as the API response
      res.json({ text });
    })
    .catch((error) => {
      console.error('Error during OCR:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


app.get('/tts', async (req, res) => {
    const text = req.query.text;
    const lang = 'bn';
    const speed = 1;  // Adjust speech speed as needed
  
    const url = tts.getAudioUrl(text, {
      lang: lang,
      slow: speed < 1
    });

    await saveAudioToFile(url, './uploads/audioOutput2.mp3')
  
    res.json({ url });
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


async function saveAudioToFile(audioURL, outputPath) {
  try {
    // Fetch audio data using axios
    const response = await axios.get(audioURL, { responseType: 'arraybuffer' });

    // Convert the array buffer to a Buffer
    const audioBuffer = Buffer.from(response.data);

    // Save the Buffer to a file
    fs.writeFileSync(outputPath, audioBuffer);

    console.log('Audio saved to', outputPath);
  } catch (error) {
    console.error('Error fetching audio:', error.message);
    throw error;
  }
}
