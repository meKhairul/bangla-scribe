import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';


const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState('');
  const [inputText, setInputText] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);

  const generateAudio = async => {
    // Function to fetch audio link from your API
    console.log("AAA ",extractedText);
    const fetchAudioLink = async () => {
      try {
        const response = await fetch('http://localhost:4000/tts?text='+extractedText);
        if (response.ok) {
          const data = await response.json();
          console.log("BBB ",data.url);
          setAudioUrl(data.url);
        } else {
          console.error('Error fetching audio link');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Call the fetchAudioLink function when the component mounts
    fetchAudioLink();
  };
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:4000/extract-bangla-text', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setExtractedText(result.text);
      } else {
        setError('Error extracting Bangla text.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image.');
    }
  };

  return (
    <div style={{textAlign:'center'}} >
      {/* <audio src='http://localhost:4000/uploads/audioOutput2.mp3' type="audio/mpeg" autoPlay /> */}
      
      <h2 >Image Uploader</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button class="btn btn-primary mb-4" onClick={handleUpload}>Upload Image</button>
      
      
      <div style={{display:'flex',textAlign:'center',margin:'2% 15%'}}>

      {selectedImage && (
        <div class="mr-4">
          <h3>Input Image</h3>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            style={{ width: '400px', height: '400px', marginTop: '2%' }}
          />
        </div>
      )}

      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
      {extractedText && (
        
        
          <div style={{marginTop:'-0.5rem'}} >
            
          <h2 >Extracted Text</h2>
          <div class="mb-4">
            <textarea style={{ width: '500px', height: '400px', maxHeight:'500px',maxWidth:'600px', marginTop: '10px' }}
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              placeholder="Type your text here..."
               rows="4"></textarea>
            
          </div>

         
          <br />
          <button class="btn btn-primary mb-4" onClick={generateAudio}>Generate Speech</button>
          {audioUrl && (
            <>
              <div class="mb-4" className="audio"></div>
              <audio style={{ width: '400px', height: '100px', marginTop: '10px', color:'olive' }} controls>
                <source src={'http://localhost:4000/uploads/audioOutput2.mp3'} type="audio/mpeg" autoPlay />
                
              </audio>
              
            </>
            
          )}
          
        </div>)}
        </div>


    </div>
    
  );
};

export default ImageUploader;
