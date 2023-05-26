import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "./test2.css";
import { useHistory } from "react-router-dom";

function Test() {
  const [datos, setDatos] = useState({
    areas_estudio: '',
    habilidades: '',
    actividades: '',
    desafios: '',
    entorno_trabajo: '',
    interaccion_personas: '',
    tecnologia: '',
    objetivo: '',
    ubicacion: ''
  });  
  const [resultado, setResultado] = useState('');
  const [modalOpen, setModalOpen] = useState(false); 
  const history = useHistory();  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatos(prevDatos => ({ ...prevDatos, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Enviar los datos al backend para la predicción
    axios.post('http://localhost:8000/predicciontwo', {
      areas_estudio: datos.areas_estudio,
      habilidades: datos.habilidades,
      actividades: datos.actividades,
      desafios: datos.desafios,
      entorno_trabajo: datos.entorno_trabajo,
      interaccion_personas: datos.interaccion_personas,
      tecnologia: datos.tecnologia,
      objetivo: datos.objetivo,
      ubicacion: datos.ubicacion
    })
    .then(response => {
      // Obtener la respuesta del backend y actualizar el estado del resultado
      setResultado(response.data.profesion_predicha);
      setModalOpen(true);
      console.log('Profesión predicha:', response.data);
    })
    .catch(error => {
      console.error('Error al obtener la predicción:', error);
    });
  };

  const resetForm = () => {
    setDatos({
      areas_estudio: '',
      habilidades: '',
      actividades: '',
      desafios: '',
      entorno_trabajo: '',
      interaccion_personas: '',
      tecnologia: '',
      objetivo: '',
      ubicacion: ''
    });
  };
  

  const closeModal = () => {
    setModalOpen(false); // Cerrar la ventana modal
    resetForm();
  };

  const handleGoToHome = () => {
    history.push("/home");
  };
  
  return (
    <div className="page-container-test2">
      <button className="btn-inicio" onClick={handleGoToHome}>Inicio</button>
      <div className="content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-column">
              <div className="form-question">
                <label>¿Qué área te gustaría explorar en tu futura carrera?</label>
                <input type="text" name="areas_estudio" value={datos.areas_estudio} onChange={handleChange} placeholder="Ingresa el área" />
              </div>
  
              <div className="form-question">
                <label>¿Cuál es tu habilidad o talento destacado?</label>
                <input type="text" name="habilidades" value={datos.habilidades} onChange={handleChange} placeholder="Ingresa tu habilidad o talento" />
              </div>
  
              <div className="form-question">
                <label>¿Qué tipo de actividad disfrutas realizar en tu tiempo libre?</label>
                <input type="text" name="actividades" value={datos.actividades} onChange={handleChange} placeholder="Ingresa tu actividad favorita" />
              </div>
  
              <div className="form-question">
                <label>¿Qué desafíos te gustaría enfrentar en tu futura profesión?</label>
                <input type="text" name="desafios" value={datos.desafios} onChange={handleChange} placeholder="Ingresa el desafío" />
              </div>
  
              <div className="form-question">
                <label>¿Prefieres trabajar de manera colaborativa o individual?</label>
                <input type="text" name="entorno_trabajo" value={datos.entorno_trabajo} onChange={handleChange} placeholder="Colaborativo o Individual" />
              </div>
            </div>
  
            <div className="form-column">
              <div className="form-question">
                <label>¿Cuánta interacción te gustaría tener con otras personas en tu trabajo diario?</label>
                <input type="text" name="interaccion_personas" value={datos.interaccion_personas} onChange={handleChange} placeholder="Alto o Medio" />
              </div>
  
              <div className="form-question">
                <label>¿Te sientes cómodo/a utilizando tecnología en tu trabajo?</label>
                <input type="text" name="tecnologia" value={datos.tecnologia} onChange={handleChange} placeholder="Si o No" />
              </div>
  
              <div className="form-question">
                <label>¿Cuál crees que sería tu principal objetivo o motivación en tu carrera profesional?</label>
                <input type="text" name="objetivo" value={datos.objetivo} onChange={handleChange} placeholder="Ingresa tu objetivo" />
              </div>
  
              <div className="form-question">
                <label>¿En qué tipo de ubicación te gustaría trabajar?</label>
                <input type="text" name="ubicacion" value={datos.ubicacion} onChange={handleChange} placeholder="Ingresa tu ubicación" />
              </div>
            </div>
  
            <button className="btn-test" type="submit">
              Enviar
            </button>
          </form>
        </div>
  
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            contentLabel="Carrera Recomendada"
            className="custom-modal"
            >
            <div className="custom-modal-content">
                <p>Tu carrera recomendada es: {resultado}</p>
                <button onClick={closeModal}>Cerrar</button>
            </div>
        </Modal>
      </div>
    </div>
  );
  
}

export default Test;
