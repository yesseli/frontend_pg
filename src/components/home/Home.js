import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useHistory } from "react-router-dom";
import "./home.css";
import Cookies from 'js-cookie';
import logo from '../../images/logo.png';
import logout from '../../images/logout.png';


function Welcome() {
  const history = useHistory(); 
  

  const handleIniciarTest = () => {
    history.push("/predicciontwo"); 
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/logout');
      Cookies.remove('token'); // Eliminar la cookie en el cliente
      history.push('/'); // Redirigir al inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="container">
      <div className='sidebar-home'>
        <div className='logo-img'>
          <img src={logo} alt="li"/>
        </div>
        <div className='logout'>
          <button onClick={handleLogout} id="btn-logout">
            <img src={logout} alt="li"/>
          </button>
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
