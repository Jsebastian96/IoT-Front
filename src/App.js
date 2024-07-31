import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [reportes, setReportes] = useState([]);
  const [selectedReporte, setSelectedReporte] = useState(null);
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    fetchReportes();
  }, []);

  const fetchReportes = async () => {
    try {
      const response = await axios.get('https://iot-back-production.up.railway.app/reportes');
      setReportes(response.data);
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
    }
  };

  const analyzeImage = async (id) => {
    try {
      const response = await axios.post(`https://iot-back-production.up.railway.app/analyze/${id}`);
      setAnalysis(response.data);
    } catch (error) {
      console.error('Error al analizar la imagen:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reportes de Imágenes</h1>
      <div className="grid grid-cols-3 gap-4">
        {reportes.map((reporte) => (
          <div
            key={reporte._id}
            className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSelectedReporte(reporte);
              setAnalysis('');
            }}
          >
            <p><strong>Latitud:</strong> {reporte.latitude}</p>
            <p><strong>Longitud:</strong> {reporte.longitude}</p>
            <img
              src={`data:image/jpeg;base64,${reporte.image}`}
              alt="Reporte"
              className="mt-2"
            />
          </div>
        ))}
      </div>
      {selectedReporte && (
        <div className="mt-8 p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-4">Detalle del Reporte</h2>
          <p><strong>Latitud:</strong> {selectedReporte.latitude}</p>
          <p><strong>Longitud:</strong> {selectedReporte.longitude}</p>
          <img
            src={`data:image/jpeg;base64,${selectedReporte.image}`}
            alt="Reporte"
            className="mt-2"
          />
          <button
            onClick={() => analyzeImage(selectedReporte._id)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Analizar Imagen
          </button>
          {analysis && (
            <div className="mt-4 p-4 border rounded bg-gray-100">
              <h3 className="font-bold">Análisis:</h3>
              <p>{analysis}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
