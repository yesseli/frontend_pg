import React, { useState } from 'react';
import axios from 'axios';
import "./test.css"

function Test() {
  const [habilidad, setHabilidad] = useState('');
  const [intereses, setIntereses] = useState('');
  const [resultado, setResultado] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Enviar los datos al backend para la predicción
    axios.post('http://localhost:8000/prediccion', {
      habilidades: habilidad,  // Corregir nombre de la variable
      intereses: intereses
    })
    .then(response => {
      // Obtener la respuesta del backend y actualizar el estado del resultado
      setResultado(response.data['profesion predicha']);  // Corregir el nombre del campo
    })
    .catch(error => {
      console.error('Error al obtener la predicción:', error);
    });
  };
  
  return (
    <div className="page-container">
      <div className="sidebar-test">
        {/* Contenido del sidebar */}
      </div>
      <div className="content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-question">
              <label>¿Cuál es tu habilidad?</label>
              <input type="text" value={habilidad} onChange={(event) => setHabilidad(event.target.value)} placeholder="Ingresa tu habilidad"/>
            </div>

            <div className="form-question">
              <label>¿Cuáles son tus intereses?</label>
              <input type="text" value={intereses} onChange={(event) => setIntereses(event.target.value)} placeholder="Ingresa tus intereses"/>
            </div>

            <button className='btn-test' type="submit">
              Enviar
            </button>
          </form>
        </div>

        {resultado && (
          <div className="resultado-container">
            <p>Tu carrera recomendada es: {resultado}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;
