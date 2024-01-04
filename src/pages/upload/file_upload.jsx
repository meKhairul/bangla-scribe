import React, { useState } from 'react';
import './style.css';

function FileUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container">
      <input
        accept="image/*"
        id="image-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <label htmlFor="image-upload" className="upload-btn">
        <span>Upload an Image</span>
      </label>
      {selectedImage && (
        <div className="image-preview">
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
      {selectedImage && (
        <button className="generate-btn">Generate Speech</button>
      )}
    </div>
  );
}

export default FileUpload;
