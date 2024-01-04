import React, { useState, useEffect } from 'react';


function TypeSomething() {
  const [inputText, setInputText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const generateAudio = async => {
    // Function to fetch audio link from your API
    console.log("AAA ",inputText);
    const fetchAudioLink = async () => {
      try {
        const response = await fetch('http://localhost:4000/tts?text=পৃথিবীতে যদি কঠিন বলে কিছু থাকে; তাহলে সেটা হলো মানুষ চেনো');
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
  
  
  return (
    <div>
      <h2>Editable Text Area</h2>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your text here..."
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={generateAudio}>Generate</button>
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      
    </div>
  );
}
export default TypeSomething;