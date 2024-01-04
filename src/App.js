import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import NavBar from './pages/navbar/navbar';
import FileUpload from './pages/upload/file_upload';
import ImageCarousel from './pages/home/carousel';
import TypeSomething from './pages/home/text_area';
import ImageUploader from './pages/home/imageUploader';

function App() {
  
  return (
    <div>
    <head>

    <link rel="stylesheet" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" href= "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"></link>
    </head>
    <div >
    <NavBar style={{backgroundColor:'white'}}></NavBar>
    </div>
    { <ImageCarousel></ImageCarousel> }
    <ImageUploader></ImageUploader>
    
    </div>
  );

}


export default App;
