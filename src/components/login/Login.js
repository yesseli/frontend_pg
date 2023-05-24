import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";
import axios from 'axios';
import logo from '../../images/logo.png';

function Login() {
  const history = useHistory(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //lógica de autenticación
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);

      const { username } = response.data;

      // Redirige al /home
      history.push("/home", { username });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page"> 
      <div className="image"> 
        <img src={logo} alt="Logo" />
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <label className="iniciar">
              Iniciar sesión
          </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
            />
            <br/>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          <br />
          <button type="submit">Iniciar sesión</button>
          <p>¿No tienes una cuenta? Crea una ahora</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
