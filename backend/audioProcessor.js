const axios = require('axios');
const fs = require('fs');

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

// Replace 'https://example.com/audio.mp3' with the actual URL of your audio file
const audioURL = 'https://translate.google.com/translate_tts?ie=UTF-8&q=%E0%A6%B8%E0%A6%BE%E0%A6%A6%E0%A6%BE%E0%A6%A4%20%E0%A6%B9%E0%A7%8B%E0%A6%B8%E0%A6%BE%E0%A6%87%E0%A6%A8%E0%A6%B7%E0%A7%8D%E0%A6%A0%20%3F&tl=bn&total=1&idx=0&textlen=17&client=tw-ob&prev=input&ttsspeed=1';
const outputPath = './uploads/audioOutput.mp3'; // Specify the desired output file path

saveAudioToFile(audioURL, outputPath)
  .then(() => {
    console.log('Audio saved successfully!');
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
