import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "./test.css"
import { useHistory } from "react-router-dom";


function Test() {
  const [habilidad, setHabilidad] = useState('');
  const [intereses, setIntereses] = useState('');
  const [resultado, setResultado] = useState('');
  const [modalOpen, setModalOpen] = useState(false); 
  const history = useHistory(); 

  const handleSubmit = (event) => {
    event.preventDefault();

    // Enviar los datos al backend para la predicción
    axios.post('http://localhost:8000/prediccion', {
      habilidades: habilidad,
      intereses: intereses
    })
    .then(response => {
      // Obtener la respuesta del backend y actualizar el estado del resultado
      setResultado(response.data['profesion predicha']);
      setModalOpen(true); // Abrir la ventana modal
    })
    .catch(error => {
      console.error('Error al obtener la predicción:', error);
    });
  };

  const closeModal = () => {
    setModalOpen(false); // Cerrar la ventana modal
  };

  const handleGoToHome = () => {
    history.push("/home");
};
  
  return (
    <div className="page-container">
      <button className='btn-inicio' onClick={handleGoToHome}>Inicio</button>
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
