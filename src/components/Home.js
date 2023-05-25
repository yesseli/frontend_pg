import React from 'react';
import {useHistory } from "react-router-dom";
import "./home.css";
import logo from '../images/logo.png';
import logout from '../images/logout.png';


function Welcome() {
  const history = useHistory(); 

  const handleIniciarTest = () => {
    history.push("/prediccion"); 
  };

  return (
    <div className="container">
      <div className='sidebar-home'>
        <div className='logo-img'>
          <img src={logo} alt="li"/>
        </div>
        <div className='logout'>
          <img src={logout} alt="li"/>
        </div>
      </div>
      <div className='content'>
        <h1 className='txt-bienvenida'>Bienvenido a My Career Match!</h1>
        <p className='parrafo'>
          Sabemos que elegir una carrera puede ser abrumador y estresante, pero <br />
          estamos aquí para ayudarte.</p>
        <div className="button-container">
          <button className='btn-inicio-test' type="submit" onClick={handleIniciarTest}>
            Iniciar test
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
