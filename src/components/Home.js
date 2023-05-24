import React from 'react';
import { Link } from "react-router-dom";
import "./home.css";

function Welcome() {
  return (
    <div className='fondo'>
      <form>
      <h1 className='txt-bienvenida'>Bienvenido a My Career Match</h1>
      </form>
      <form>
      <button className='btn-inicio-test' type="submit">
        <Link to="/Test" className="link" >Iniciar test</Link>
      </button>
      </form>
    </div>

    
    
  );
}

export default Welcome;