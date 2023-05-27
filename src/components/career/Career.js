import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./career.css"

function CareerList() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/careers');
      const responseData = response.data;
      const careersData = responseData.careers;
      setCareers(careersData);
    } catch (error) {
      console.error('Error al cargar la lista de carreras:', error);
    }
  };

  return (
    <div className="container-career">
      <h3>Lista de carreras</h3>
      <table className="career-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Áreas de estudio</th>
            <th>Habilidades</th>
            <th>Actividades</th>
            <th>Desafíos</th>
            <th>Entorno de trabajo</th>
            <th>Interacción con personas</th>
            <th>Tecnología</th>
            <th>Objetivo</th>
            <th>Ubicación</th>
          </tr>
        </thead>
        <tbody>
          {careers.map(career => (
            <tr key={career._id}>
              <td>{career._id}</td>
              <td>{career.nombre}</td>
              <td>{career.descripcion}</td>
              <td>{career.areas_estudio.join(", ")}</td>
              <td>{career.habilidades.join(", ")}</td>
              <td>{career.actividades.join(", ")}</td>
              <td>{career.desafios.join(", ")}</td>
              <td>{career.entorno_trabajo.join(", ")}</td>
              <td>{career.interaccion_personas}</td>
              <td>{career.tecnologia}</td>
              <td>{career.objetivo}</td>
              <td>{career.ubicacion.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CareerList;
