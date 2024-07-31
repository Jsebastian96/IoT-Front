import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [report, setReport] = useState('');

  useEffect(() => {
    axios.get('/images').then(response => {
      setImages(response.data);
    });
  }, []);

  const handleUpload = (event) => {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);

    axios.post('/upload', formData).then(() => {
      axios.get('/images').then(response => {
        setImages(response.data);
      });
    });
  };

  const handleAnalyze = (id) => {
    axios.post(`/analyze/${id}`).then(response => {
      setReport(response.data);
    });
  };

  return (
    <div className="App">
      <h1>Subir y Analizar Imágenes</h1>
      <input type="file" onChange={handleUpload} />
      <div>
        {images.map(image => (
          <div key={image._id}>
            <img src={`data:${image.contentType};base64,${Buffer.from(image.data).toString('base64')}`} alt="img" />
            <button onClick={() => handleAnalyze(image._id)}>Analizar</button>
          </div>
        ))}
      </div>
      <h2>Informe</h2>
      <p>{report}</p>
    </div>
  );
}

export default App;
