import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import "./login.css";
import axios from 'axios';
import logo from '../../images/logo.png';
import Cookies from 'js-cookie';

function Login() {
  const history = useHistory(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //lógica de autenticación
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'token': Cookies.get('token')
        }
      });
      const { message, token, role } = response.data;

      // Almacenar el token en las cookies del navegador
      Cookies.set('token', token, { expires: 7, path: '/', sameSite: 'none', secure: true });

      console.log(message);
      console.log(token);
      console.log(role)
    
      // Redirige al /home
      if (role === "admin") {
        history.push("/users");
      } else if (role === "student") {
        history.push("/home");
      } else {
      }
    } catch (error) {
      console.error(error);
      setError("Correo electrónico o contraseña incorrectos");
    }
  };

  const handleCloseError = () => {
    setError("");
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
      {error && (
        <div className="modal-login">
        <div className="modal-login-content">
          <p className="error-message">{error}</p>
          <div>
            <button className="close-button" onClick={handleCloseError}>
              x
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Login;
