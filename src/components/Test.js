import React from 'react';
import "./test.css"

function Test() {
  return (
    <div className="form-container">
      <form>
        <div className="form-question">
          <label htmlFor="question1">¿Qué asignaturas te gustan más?</label>
          <input type="text" id="question1" placeholder="Respuesta"/>
        </div>

        <div className="form-question">
          <label htmlFor="question2">¿Qué tipo de tareas o actividades disfrutas haciendo?</label>
          <input type="text" id="question2" placeholder="Respuesta"/>
        </div>

        <div className="form-question">
          <label htmlFor="question3">¿Qué habilidad crees que tienes y te gustaría seguir desarrollando?</label>
          <input type="text" id="question3" placeholder="Respuesta"/>
        </div>

        <div className="form-question">
          <label htmlFor="question4">¿Tienes algún interés que te gustaría incorporar en tu carrera profesional?</label>
          <input type="text" id="question4" placeholder="Respuesta"/>
        </div>

        <div className="form-question">
          <label htmlFor="question5">¿Qué tipo de ambiente de trabajo te atrae más?</label>
          <input type="text" id="question5" placeholder="Respuesta"/>
        </div>
        <button className='btn-test'>
            Enviar
        </button>
      </form>
    </div>
  );
}

export default Test;
